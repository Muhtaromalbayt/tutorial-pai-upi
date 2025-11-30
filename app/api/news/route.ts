import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { news } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const runtime = "edge";

// GET all news
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const newsList = await db.select().from(news).orderBy(desc(news.createdAt)).all();

        return NextResponse.json({ news: newsList });
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
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { title, content, category, imageUrl, author, publishedDate, isPublished } = body;

        // Generate ID
        const id = `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const newNews = await db
            .insert(news)
            .values({
                id,
                title,
                content,
                category: category || "announcement",
                imageUrl,
                author,
                publishedDate,
                isPublished: isPublished ? true : false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
            .returning();

        return NextResponse.json({ news: newNews[0] });
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
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { id, title, content, category, imageUrl, author, publishedDate, isPublished } = body;

        const updated = await db
            .update(news)
            .set({
                title,
                content,
                category,
                imageUrl,
                author,
                publishedDate,
                isPublished: isPublished ? true : false,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(news.id, id))
            .returning();

        return NextResponse.json({ news: updated[0] });
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
        const db = drizzle(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(news).where(eq(news.id, id));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting news:", error);
        return NextResponse.json(
            { error: "Failed to delete news", details: error.message },
            { status: 500 }
        );
    }
}
