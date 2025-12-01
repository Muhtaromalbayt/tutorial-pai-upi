// Cloudflare Pages Function for Feedback
// This runs as a native Cloudflare Worker with full access to bindings

interface Env {
    DB: D1Database;
}

interface FeedbackBody {
    name?: string;
    email?: string;
    isAnonymous?: boolean;
    category: string;
    subject: string;
    message: string;
    attachments?: any[];
}

export async function onRequestPost(context: { request: Request; env: Env }) {
    try {
        const { request, env } = context;

        // Parse body
        const body = await request.json() as FeedbackBody;
        const { name, email, isAnonymous, category, subject, message, attachments } = body;

        // Validation
        if (!category || !subject || !message) {
            return new Response(
                JSON.stringify({ error: "Category, subject, and message are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Generate unique ID
        const id = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Insert into D1
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

        return new Response(
            JSON.stringify({
                success: true,
                message: "Feedback submitted successfully",
                id
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Error submitting feedback:", error);
        return new Response(
            JSON.stringify({ error: "Failed to submit feedback", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function onRequestGet(context: { request: Request; env: Env }) {
    try {
        const { env } = context;

        const { results } = await env.DB.prepare(`
      SELECT * FROM feedback ORDER BY created_at DESC
    `).all();

        return new Response(
            JSON.stringify({ feedback: results }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Error fetching feedback:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch feedback", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
