import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, news } from "@/lib/db/client";
import { eq, desc, and, ne } from "drizzle-orm";

export const runtime = "edge";

// GET all news - supports ?location=home|kabar filter
export async function GET(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const location = searchParams.get("location");

        let result;

        if (location === "home") {
            // Only news that should appear on home page
            result = await db.select().from(news)
                .where(and(
                    eq(news.isPublished, true),
                    eq(news.displayLocation, "home")
                ))
                .orderBy(desc(news.createdAt));
        } else if (location === "kabar") {
            // All published news except archived
            result = await db.select().from(news)
                .where(and(
                    eq(news.isPublished, true),
                    ne(news.displayLocation, "archived")
                ))
                .orderBy(desc(news.createdAt));
        } else {
            // All news (for CMS)
            result = await db.select().from(news).orderBy(desc(news.createdAt));
        }

        return NextResponse.json({ news: result });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching news:", message);
        return NextResponse.json(
            { error: "Failed to fetch news", details: message },
            { status: 500 }
        );
    }
}

// POST new news
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            title: string;
            content: string;
            category?: string;
            imageUrl?: string;
            author?: string;
            publishedDate?: string;
            isPublished?: boolean;
            displayLocation?: string;
        };
        const { title, content, category, imageUrl, author, publishedDate, isPublished, displayLocation } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        const id = `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        await db.insert(news).values({
            id,
            title,
            content,
            category: category || "Kegiatan",
            imageUrl: imageUrl || null,
            author: author || null,
            publishedDate: publishedDate || null,
            isPublished: isPublished || false,
            displayLocation: displayLocation || "kabar_only",
            createdAt: now,
            updatedAt: now,
        });

        return NextResponse.json({ success: true, id });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error creating news:", message);
        return NextResponse.json(
            { error: "Failed to create news", details: message },
            { status: 500 }
        );
    }
}

// PUT update news
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            id: string;
            title: string;
            content: string;
            category?: string;
            imageUrl?: string;
            author?: string;
            publishedDate?: string;
            isPublished?: boolean;
            displayLocation?: string;
        };
        const { id, title, content, category, imageUrl, author, publishedDate, isPublished, displayLocation } = body;

        if (!id) {
            return NextResponse.json(
                { error: "News ID is required" },
                { status: 400 }
            );
        }

        const now = new Date().toISOString();

        await db.update(news)
            .set({
                title,
                content,
                category,
                imageUrl: imageUrl || null,
                author: author || null,
                publishedDate: publishedDate || null,
                isPublished: isPublished || false,
                displayLocation: displayLocation || "kabar_only",
                updatedAt: now,
            })
            .where(eq(news.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error updating news:", message);
        return NextResponse.json(
            { error: "Failed to update news", details: message },
            { status: 500 }
        );
    }
}

// DELETE news
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(news).where(eq(news.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error deleting news:", message);
        return NextResponse.json(
            { error: "Failed to delete news", details: message },
            { status: 500 }
        );
    }
}
