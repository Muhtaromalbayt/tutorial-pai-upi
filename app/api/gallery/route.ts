import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, gallery } from "@/lib/db/client";
import { eq, desc } from "drizzle-orm";

export const runtime = "edge";

// GET all gallery items
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const result = await db.select().from(gallery).orderBy(desc(gallery.createdAt));

        return NextResponse.json({ gallery: result });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching gallery:", message);
        return NextResponse.json(
            { error: "Failed to fetch gallery", details: message },
            { status: 500 }
        );
    }
}

// POST new gallery item
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            title: string;
            description?: string;
            imageUrl: string;
            category?: string;
            placeholder?: string;
            isPublished?: boolean;
        };
        const { title, description, imageUrl, category, placeholder, isPublished } = body;

        if (!title || !imageUrl) {
            return NextResponse.json(
                { error: "Title and image URL are required" },
                { status: 400 }
            );
        }

        const id = `gal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        await db.insert(gallery).values({
            id,
            title,
            description: description || null,
            imageUrl,
            category: category || "Kegiatan",
            placeholder: placeholder || null,
            isPublished: isPublished !== false,
            createdAt: now,
            updatedAt: now,
        });

        return NextResponse.json({ success: true, id });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error creating gallery item:", message);
        return NextResponse.json(
            { error: "Failed to create gallery item", details: message },
            { status: 500 }
        );
    }
}

// PUT update gallery item
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            id: string;
            title: string;
            description?: string;
            imageUrl: string;
            category?: string;
            placeholder?: string;
            isPublished?: boolean;
        };
        const { id, title, description, imageUrl, category, placeholder, isPublished } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Gallery ID is required" },
                { status: 400 }
            );
        }

        const now = new Date().toISOString();

        await db.update(gallery)
            .set({
                title,
                description: description || null,
                imageUrl,
                category,
                placeholder: placeholder || null,
                isPublished: isPublished !== false,
                updatedAt: now,
            })
            .where(eq(gallery.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error updating gallery item:", message);
        return NextResponse.json(
            { error: "Failed to update gallery item", details: message },
            { status: 500 }
        );
    }
}

// DELETE gallery item
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(gallery).where(eq(gallery.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error deleting gallery item:", message);
        return NextResponse.json(
            { error: "Failed to delete gallery item", details: message },
            { status: 500 }
        );
    }
}
