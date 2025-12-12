import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { corsHeaders, handleCors } from "@/lib/cors";

export const runtime = "edge";

// Handle preflight request
export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get("origin");
    return handleCors(origin);
}

function addCorsHeaders(response: NextResponse, origin: string | null) {
    const headers = corsHeaders(origin);
    Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
    });
    return response;
}

// GET all news
export async function GET(request: NextRequest) {
    const origin = request.headers.get("origin");

    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const result = await db.prepare(
            "SELECT * FROM news ORDER BY created_at DESC"
        ).all();

        return addCorsHeaders(NextResponse.json({ news: result.results }), origin);
    } catch (error: any) {
        console.error("Error fetching news:", error);
        return addCorsHeaders(
            NextResponse.json({ error: "Failed to fetch news", details: error.message }, { status: 500 }),
            origin
        );
    }
}

// POST new news
export async function POST(req: NextRequest) {
    const origin = req.headers.get("origin");

    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const body = await req.json() as any;
        const { title, content, category, imageUrl, author, publishedDate, isPublished } = body;

        if (!title || !content) {
            return addCorsHeaders(
                NextResponse.json({ error: "Title and content are required" }, { status: 400 }),
                origin
            );
        }

        const id = `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();
        const published = isPublished ? 1 : 0;

        await db.prepare(
            `INSERT INTO news (id, title, content, category, image_url, author, published_date, is_published, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            id,
            title,
            content,
            category || "Kegiatan",
            imageUrl || null,
            author || null,
            publishedDate || null,
            published,
            now,
            now
        ).run();

        return addCorsHeaders(NextResponse.json({ success: true, id }), origin);
    } catch (error: any) {
        console.error("Error creating news:", error);
        return addCorsHeaders(
            NextResponse.json({ error: "Failed to create news", details: error.message }, { status: 500 }),
            origin
        );
    }
}

// PUT update news
export async function PUT(req: NextRequest) {
    const origin = req.headers.get("origin");

    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const body = await req.json() as any;
        const { id, title, content, category, imageUrl, author, publishedDate, isPublished } = body;

        if (!id) {
            return addCorsHeaders(
                NextResponse.json({ error: "News ID is required" }, { status: 400 }),
                origin
            );
        }

        const now = new Date().toISOString();
        const published = isPublished ? 1 : 0;

        await db.prepare(
            `UPDATE news SET title = ?, content = ?, category = ?, image_url = ?, author = ?, published_date = ?, is_published = ?, updated_at = ? WHERE id = ?`
        ).bind(
            title,
            content,
            category,
            imageUrl || null,
            author || null,
            publishedDate || null,
            published,
            now,
            id
        ).run();

        return addCorsHeaders(NextResponse.json({ success: true }), origin);
    } catch (error: any) {
        console.error("Error updating news:", error);
        return addCorsHeaders(
            NextResponse.json({ error: "Failed to update news", details: error.message }, { status: 500 }),
            origin
        );
    }
}

// DELETE news
export async function DELETE(req: NextRequest) {
    const origin = req.headers.get("origin");

    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return addCorsHeaders(NextResponse.json({ error: "ID required" }, { status: 400 }), origin);
        }

        await db.prepare("DELETE FROM news WHERE id = ?").bind(id).run();

        return addCorsHeaders(NextResponse.json({ success: true }), origin);
    } catch (error: any) {
        console.error("Error deleting news:", error);
        return addCorsHeaders(
            NextResponse.json({ error: "Failed to delete news", details: error.message }, { status: 500 }),
            origin
        );
    }
}
