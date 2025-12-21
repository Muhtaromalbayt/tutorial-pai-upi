import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Helper to convert Google Drive URL to high-res preview URL
function getGoogleDrivePreviewUrl(url: string, size: number = 2000): string {
    if (!url) return "";

    let fileId = "";
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
        fileId = fileIdMatch[1];
    } else {
        const openIdMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
        if (openIdMatch) {
            fileId = openIdMatch[1];
        }
    }

    if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
    }

    return url;
}

// GET photo by placeholder ID
// Usage: /api/gallery/placeholder/hero_home
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { env } = getRequestContext();
        const placeholderId = params.id;

        if (!placeholderId) {
            return NextResponse.json(
                { error: "Placeholder ID is required" },
                { status: 400 }
            );
        }

        // Use raw SQL for reliability
        const result = await env.DB.prepare(`
            SELECT id, title, description, image_url, category, placeholder, is_published 
            FROM gallery 
            WHERE placeholder = ? AND is_published = 1
            ORDER BY created_at DESC
            LIMIT 1
        `).bind(placeholderId).all();

        if (!result.results || result.results.length === 0) {
            return NextResponse.json({
                photo: null,
                previewUrl: null,
                fallback: true,
                message: "No photo found for this placeholder"
            });
        }

        const photo = result.results[0] as {
            id: string;
            title: string;
            description: string | null;
            image_url: string;
            category: string;
            placeholder: string;
            is_published: number;
        };

        // Convert to high-res preview URL
        const previewUrl = getGoogleDrivePreviewUrl(photo.image_url, 2000);

        return NextResponse.json({
            photo: {
                id: photo.id,
                title: photo.title,
                description: photo.description,
                imageUrl: photo.image_url,
                category: photo.category,
                placeholder: photo.placeholder,
            },
            previewUrl,
            fallback: false,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching photo by placeholder:", message);

        // If table doesn't exist, return fallback
        if (message.includes("no such table")) {
            return NextResponse.json({
                photo: null,
                previewUrl: null,
                fallback: true,
                message: "Gallery table not found"
            });
        }

        return NextResponse.json(
            { error: "Failed to fetch photo", details: message, fallback: true },
            { status: 500 }
        );
    }
}
