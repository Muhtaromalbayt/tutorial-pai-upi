import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/d1";
import { feedback } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createAuth } from "@/lib/auth";
import { sendFeedbackEmail } from "@/lib/email";

export const runtime = "edge";

// Helper to check admin auth
async function checkAdminAuth(req: NextRequest, db: any) {
    const auth = createAuth(db);
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return false;
    return true; // Assuming all authenticated users are admins for now
}

// GET - Fetch all feedback (admin only)
export async function GET(req: NextRequest) {
    try {
        const dbBinding = getRequestContext().env.DB;
        const isAdmin = await checkAdminAuth(req, dbBinding);

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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

        const db = drizzle(getRequestContext().env.DB);

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
    } catch (error: any) {
        console.error("Error submitting feedback:", error);
        return NextResponse.json(
            { error: "Failed to submit feedback" },
            { status: 500 }
        );
    }
}

// PUT - Update feedback status/notes (admin only)
export async function PUT(req: NextRequest) {
    try {
        const dbBinding = getRequestContext().env.DB;
        const isAdmin = await checkAdminAuth(req, dbBinding);

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json() as any;
        const { id, status, adminNotes } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Feedback ID is required" },
                { status: 400 }
            );
        }

        const db = drizzle(dbBinding);

        const updates: any = {
            updatedAt: new Date().toISOString(),
        };

        if (status) updates.status = status;
        if (adminNotes !== undefined) updates.adminNotes = adminNotes;

        await db.update(feedback)
            .set(updates)
            .where(eq(feedback.id, id));

        return NextResponse.json({
            success: true,
            message: "Feedback updated successfully"
        });
    } catch (error: any) {
        console.error("Error updating feedback:", error);
        return NextResponse.json(
            { error: "Failed to update feedback" },
            { status: 500 }
        );
    }
}

// DELETE - Delete feedback (admin only)
export async function DELETE(req: NextRequest) {
    try {
        const dbBinding = getRequestContext().env.DB;
        const isAdmin = await checkAdminAuth(req, dbBinding);

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Feedback ID is required" },
                { status: 400 }
            );
        }

        const db = drizzle(dbBinding);

        await db.delete(feedback).where(eq(feedback.id, id));

        return NextResponse.json({
            success: true,
            message: "Feedback deleted successfully"
        });
    } catch (error: any) {
        console.error("Error deleting feedback:", error);
        return NextResponse.json(
            { error: "Failed to delete feedback" },
            { status: 500 }
        );
    }
}
