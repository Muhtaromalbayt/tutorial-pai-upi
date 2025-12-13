import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// GET all news
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const result = await db.prepare(
            "SELECT * FROM news ORDER BY created_at DESC"
        ).all();

        return NextResponse.json({ news: result.results });
    } catch (error: any) {
        console.error("Error fetching news:", error);
        return NextResponse.json(
            { error: "Failed to fetch news", details: error.message },
            { status: 500 }
        );
    }
}

// POST new news
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const body = await req.json() as any;
        const { title, content, category, imageUrl, author, publishedDate, isPublished } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
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

        return NextResponse.json({ success: true, id });
    } catch (error: any) {
        console.error("Error creating news:", error);
        return NextResponse.json(
            { error: "Failed to create news", details: error.message },
            { status: 500 }
        );
    }
}

// PUT update news
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const body = await req.json() as any;
        const { id, title, content, category, imageUrl, author, publishedDate, isPublished } = body;

        if (!id) {
            return NextResponse.json(
                { error: "News ID is required" },
                { status: 400 }
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

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error updating news:", error);
        return NextResponse.json(
            { error: "Failed to update news", details: error.message },
            { status: 500 }
        );
    }
}

// DELETE news
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.prepare("DELETE FROM news WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting news:", error);
        return NextResponse.json(
            { error: "Failed to delete news", details: error.message },
            { status: 500 }
        );
    }
}
