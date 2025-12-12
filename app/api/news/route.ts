import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { news } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
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
        const db = drizzle(env.DB);

        const newsList = await db.select().from(news).orderBy(desc(news.createdAt)).all();

        return addCorsHeaders(NextResponse.json({ news: newsList }), origin);
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
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        console.log("POST /api/news received:", JSON.stringify(body));

        const { title, content, category, imageUrl, author, publishedDate, isPublished } = body;

        if (!title || !content) {
            return addCorsHeaders(
                NextResponse.json({ error: "Title and content are required" }, { status: 400 }),
                origin
            );
        }

        // Generate ID
        const id = `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        // Insert without .returning() which may not be supported in D1
        await db.insert(news).values({
            id,
            title: title || "",
            content: content || "",
            category: category || "Kegiatan",
            imageUrl: imageUrl || null,
            author: author || null,
            publishedDate: publishedDate || null,
            isPublished: isPublished === true,
            createdAt: now,
            updatedAt: now,
        });

        // Fetch the inserted news
        const inserted = await db.select().from(news).where(eq(news.id, id)).get();

        return addCorsHeaders(NextResponse.json({ success: true, news: inserted }), origin);
    } catch (error: any) {
        console.error("Error creating news:", error);
        console.error("Error stack:", error.stack);
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
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { id, title, content, category, imageUrl, author, publishedDate, isPublished } = body;

        if (!id) {
            return addCorsHeaders(
                NextResponse.json({ error: "News ID is required" }, { status: 400 }),
                origin
            );
        }

        await db
            .update(news)
            .set({
                title,
                content,
                category,
                imageUrl: imageUrl || null,
                author: author || null,
                publishedDate: publishedDate || null,
                isPublished: isPublished === true,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(news.id, id));

        const updated = await db.select().from(news).where(eq(news.id, id)).get();

        return addCorsHeaders(NextResponse.json({ success: true, news: updated }), origin);
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
        const db = drizzle(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return addCorsHeaders(NextResponse.json({ error: "ID required" }, { status: 400 }), origin);
        }

        await db.delete(news).where(eq(news.id, id));

        return addCorsHeaders(NextResponse.json({ success: true }), origin);
    } catch (error: any) {
        console.error("Error deleting news:", error);
        return addCorsHeaders(
            NextResponse.json({ error: "Failed to delete news", details: error.message }, { status: 500 }),
            origin
        );
    }
}
