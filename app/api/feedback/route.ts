import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, feedback } from "@/lib/db/client";
import { eq, desc } from "drizzle-orm";

export const runtime = "edge";

interface FeedbackBody {
    name?: string;
    email?: string;
    isAnonymous?: boolean;
    category: string;
    subject: string;
    message: string;
    attachments?: unknown[];
}

// POST - Submit new feedback (public)
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as FeedbackBody;
        const { name, email, isAnonymous, category, subject, message, attachments } = body;

        // Validation
        if (!category || !subject || !message) {
            return NextResponse.json(
                { error: "Category, subject, and message are required" },
                { status: 400 }
            );
        }

        const id = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        await db.insert(feedback).values({
            id,
            name: isAnonymous ? null : name,
            email: isAnonymous ? null : email,
            isAnonymous: isAnonymous || false,
            category,
            subject,
            message,
            attachments: attachments ? JSON.stringify(attachments) : null,
            status: "pending",
            createdAt: now,
            updatedAt: now,
        });

        return NextResponse.json({
            success: true,
            message: "Feedback submitted successfully",
            id
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error submitting feedback:", message);
        return NextResponse.json(
            { error: "Failed to submit feedback", details: message },
            { status: 500 }
        );
    }
}

// GET - Fetch all feedback
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const result = await db.select().from(feedback).orderBy(desc(feedback.createdAt));

        return NextResponse.json({ feedback: result });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching feedback:", message);
        return NextResponse.json(
            { error: "Failed to fetch feedback", details: message },
            { status: 500 }
        );
    }
}

// PUT - Update feedback status (admin)
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as { id: string; status: string; adminNotes?: string };
        const { id, status, adminNotes } = body;

        if (!id) {
            return NextResponse.json({ error: "Feedback ID is required" }, { status: 400 });
        }

        const now = new Date().toISOString();

        await db.update(feedback)
            .set({
                status,
                adminNotes: adminNotes || null,
                updatedAt: now,
            })
            .where(eq(feedback.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error updating feedback:", message);
        return NextResponse.json(
            { error: "Failed to update feedback", details: message },
            { status: 500 }
        );
    }
}

// DELETE - Delete feedback (admin)
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(feedback).where(eq(feedback.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error deleting feedback:", message);
        return NextResponse.json(
            { error: "Failed to delete feedback", details: message },
            { status: 500 }
        );
    }
}
