import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/d1";
import { feedback } from "@/lib/db/schema";

export const runtime = "edge";

// POST - Submit new feedback (public)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as any;
        const { name, email, isAnonymous, category, subject, message, attachments } = body;

        if (!category || !subject || !message) {
            return NextResponse.json(
                { error: "Category, subject, and message are required" },
                { status: 400 }
            );
        }

        // Generate unique ID
        const id = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Get DB binding from environment
        // @ts-ignore - Cloudflare Pages env
        const dbBinding = process.env.DB as any;
        const db = drizzle(dbBinding);

        const newFeedback = {
            id,
            name: isAnonymous ? null : name,
            email: isAnonymous ? null : email,
            isAnonymous: isAnonymous || false,
            category,
            subject,
            message,
            attachments: attachments ? JSON.stringify(attachments) : null,
            status: 'pending',
            adminNotes: null,
        };

        await db.insert(feedback).values(newFeedback);

        return NextResponse.json({
            success: true,
            message: "Feedback submitted successfully",
            id
        });
    } catch (error: any) {
        console.error("Error submitting feedback:", error);
        return NextResponse.json(
            { error: "Failed to submit feedback", details: error.message },
            { status: 500 }
        );
    }
}

// GET - Fetch all feedback (public for now, will add auth later)
export async function GET(req: NextRequest) {
    try {
        // @ts-ignore - Cloudflare Pages env
        const dbBinding = process.env.DB as any;
        const db = drizzle(dbBinding);
        const allFeedback = await db.select().from(feedback).all();

        return NextResponse.json({ feedback: allFeedback });
    } catch (error: any) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json(
            { error: "Failed to fetch feedback" },
            { status: 500 }
        );
    }
}
