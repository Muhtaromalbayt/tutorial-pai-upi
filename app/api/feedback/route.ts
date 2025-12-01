import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface FeedbackBody {
    name?: string;
    email?: string;
    isAnonymous?: boolean;
    category: string;
    subject: string;
    message: string;
    attachments?: any[];
}

// Helper to get Cloudflare env
function getCloudflareContext() {
    // @ts-ignore
    return globalThis.__env__;
}

// POST - Submit new feedback (public)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as FeedbackBody;
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

        // Try multiple ways to access DB binding
        let DB;

        // Method 1: Try global env
        const globalEnv = getCloudflareContext();
        if (globalEnv?.DB) {
            DB = globalEnv.DB;
        }

        // Method 2: Try from request
        if (!DB && (req as any).env?.DB) {
            DB = (req as any).env.DB;
        }

        // Method 3: Try from context
        if (!DB) {
            try {
                // @ts-ignore
                const { env } = await import('@cloudflare/next-on-pages');
                if (env?.DB) {
                    DB = env.DB;
                }
            } catch (e) {
                console.error("Failed to import @cloudflare/next-on-pages", e);
            }
        }

        if (!DB) {
            console.error("DB binding not found in any location");
            console.error("globalEnv:", globalEnv);
            console.error("req.env:", (req as any).env);
            return NextResponse.json(
                { error: "Database not configured. Please check D1 bindings in Cloudflare Pages settings." },
                { status: 500 }
            );
        }

        // Direct D1 query
        const stmt = DB.prepare(`
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
        // Try to get DB binding
        let DB;
        const globalEnv = getCloudflareContext();
        if (globalEnv?.DB) {
            DB = globalEnv.DB;
        } else if ((req as any).env?.DB) {
            DB = (req as any).env.DB;
        }

        if (!DB) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        const { results } = await DB.prepare(`
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
