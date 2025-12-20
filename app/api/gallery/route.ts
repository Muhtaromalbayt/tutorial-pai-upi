import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Helper to convert Google Drive URL to FULL RESOLUTION image URL
function getGoogleDriveDirectUrl(url: string): string {
    if (!url) return "";

    // Extract file ID from various Google Drive URL formats
    let fileId = "";

    // Format: https://drive.google.com/file/d/FILE_ID/view
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
        fileId = fileIdMatch[1];
    } else {
        // Format: https://drive.google.com/open?id=FILE_ID
        const openIdMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
        if (openIdMatch) {
            fileId = openIdMatch[1];
        }
    }

    if (fileId) {
        // Use uc?export=view for FULL RESOLUTION original quality
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    return url;
}

// GET all gallery items
export async function GET() {
    try {
        const { env } = getRequestContext();

        // Use raw SQL to avoid DrizzleORM schema mismatch issues
        const result = await env.DB.prepare(`
            SELECT id, title, description, image_url, category, placeholder, order_index, is_published, created_at, updated_at 
            FROM gallery 
            ORDER BY created_at DESC
        `).all();

        return NextResponse.json({ gallery: result.results || [] });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching gallery:", message);

        // If table doesn't exist, return empty array
        if (message.includes("no such table")) {
            return NextResponse.json({ gallery: [], needsMigration: true });
        }

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

        // Use raw SQL for reliability
        await env.DB.prepare(`
            INSERT INTO gallery (id, title, description, image_url, category, placeholder, order_index, is_published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            id,
            title,
            description || null,
            imageUrl,
            category || "Kegiatan",
            placeholder || null,
            0,
            isPublished !== false ? 1 : 0,
            now,
            now
        ).run();

        return NextResponse.json({ success: true, id });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error creating gallery item:", message);

        // Check if table doesn't exist
        if (message.includes("no such table")) {
            return NextResponse.json(
                {
                    error: "Gallery table not found. Please run migration first.",
                    details: "Run: npx wrangler d1 execute tutorial-pai-db --file=migrations/0001_add_gallery.sql",
                    needsMigration: true
                },
                { status: 500 }
            );
        }

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

        // Use raw SQL for reliability
        await env.DB.prepare(`
            UPDATE gallery 
            SET title = ?, description = ?, image_url = ?, category = ?, placeholder = ?, is_published = ?, updated_at = ?
            WHERE id = ?
        `).bind(
            title,
            description || null,
            imageUrl,
            category || "Kegiatan",
            placeholder || null,
            isPublished !== false ? 1 : 0,
            now,
            id
        ).run();

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

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await env.DB.prepare("DELETE FROM gallery WHERE id = ?").bind(id).run();

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
