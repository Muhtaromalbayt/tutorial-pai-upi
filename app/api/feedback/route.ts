import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface CloudflareEnv {
    DB: D1Database;
}

// POST - Submit new feedback (public)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, isAnonymous, category, subject, message, attachments } = body;

        // Validation
        if (!category || !subject || !message) {
            return NextResponse.json(
                { error: "Category, subject, and message are required" },
                { status: 400 }
            );
        }

        // Generate unique ID
        const id = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Access Cloudflare D1 directly
        const env = (req as any).env as CloudflareEnv;

        if (!env?.DB) {
            console.error("DB binding not found");
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        // Direct D1 query without Drizzle
        const stmt = env.DB.prepare(`
            INSERT INTO feedback (id, name, email, is_anonymous, category, subject, message, attachments, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(
            id,
            isAnonymous ? null : name,
            isAnonymous ? null : email,
            isAnonymous ? 1 : 0,
            category,
            subject,
            message,
            attachments ? JSON.stringify(attachments) : null,
            'pending'
        );

        await stmt.run();

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

// GET - Fetch all feedback
export async function GET(req: NextRequest) {
    try {
        const env = (req as any).env as CloudflareEnv;

        if (!env?.DB) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        const { results } = await env.DB.prepare(`
            SELECT * FROM feedback ORDER BY created_at DESC
        `).all();

        return NextResponse.json({ feedback: results });
    } catch (error: any) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json(
            { error: "Failed to fetch feedback", details: error.message },
            { status: 500 }
        );
    }
}
