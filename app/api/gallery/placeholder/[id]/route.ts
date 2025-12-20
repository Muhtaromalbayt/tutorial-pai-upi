import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, gallery } from "@/lib/db/client";
import { eq, and } from "drizzle-orm";

export const runtime = "edge";

// GET photo by placeholder ID
// Usage: /api/gallery/placeholder/hero_home
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const placeholderId = params.id;

        if (!placeholderId) {
            return NextResponse.json(
                { error: "Placeholder ID is required" },
                { status: 400 }
            );
        }

        // Get the first published photo with this placeholder
        const result = await db
            .select()
            .from(gallery)
            .where(
                and(
                    eq(gallery.placeholder, placeholderId),
                    eq(gallery.isPublished, true)
                )
            )
            .limit(1);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    photo: null,
                    fallback: true,
                    message: "No photo found for this placeholder"
                }
            );
        }

        // Convert Google Drive URL to preview URL
        const photo = result[0];
        let previewUrl = photo.imageUrl;

        // Convert Google Drive share link to direct image URL
        const fileIdMatch = photo.imageUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch) {
            previewUrl = `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w800`;
        } else {
            const openIdMatch = photo.imageUrl.match(/id=([a-zA-Z0-9_-]+)/);
            if (openIdMatch) {
                previewUrl = `https://drive.google.com/thumbnail?id=${openIdMatch[1]}&sz=w800`;
            }
        }

        return NextResponse.json({
            photo: {
                ...photo,
                previewUrl,
            },
            fallback: false,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching photo by placeholder:", message);
        return NextResponse.json(
            { error: "Failed to fetch photo", details: message },
            { status: 500 }
        );
    }
}
