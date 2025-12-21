import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, knowledgeChunks } from "@/lib/db/client";
import { eq } from "drizzle-orm";

export const runtime = "edge";

// Helper function to split text into chunks
function splitIntoChunks(text: string, chunkSize: number = 500): string[] {
    const sentences = text.split(/(?<=[.!?])\s+/);
    const chunks: string[] = [];
    let currentChunk = "";

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > chunkSize && currentChunk) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        } else {
            currentChunk += " " + sentence;
        }
    }

    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

// POST - Add new knowledge from text
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            sourceFile: string;
            content: string;
        };

        const { sourceFile, content } = body;

        if (!sourceFile || !content) {
            return NextResponse.json(
                { error: "sourceFile and content are required" },
                { status: 400 }
            );
        }

        // Delete existing chunks from this source
        await db.delete(knowledgeChunks).where(eq(knowledgeChunks.sourceFile, sourceFile));

        // Split content into chunks
        const textChunks = splitIntoChunks(content, 500);

        // Insert new chunks
        const now = new Date().toISOString();
        for (let i = 0; i < textChunks.length; i++) {
            const id = `kc_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`;
            await db.insert(knowledgeChunks).values({
                id,
                sourceFile,
                chunkIndex: i,
                content: textChunks[i],
                createdAt: now,
            });
        }

        return NextResponse.json({
            success: true,
            chunksCreated: textChunks.length,
            sourceFile,
        });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error adding knowledge:", message);
        return NextResponse.json(
            { error: "Failed to add knowledge", details: message },
            { status: 500 }
        );
    }
}

// GET - List all knowledge sources
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const result = await db.select({
            sourceFile: knowledgeChunks.sourceFile,
        }).from(knowledgeChunks).groupBy(knowledgeChunks.sourceFile);

        return NextResponse.json({ sources: result.map(r => r.sourceFile) });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error listing knowledge:", message);
        return NextResponse.json(
            { error: "Failed to list knowledge", details: message },
            { status: 500 }
        );
    }
}

// DELETE - Remove knowledge source
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const sourceFile = searchParams.get("sourceFile");

        if (!sourceFile) {
            return NextResponse.json({ error: "sourceFile required" }, { status: 400 });
        }

        await db.delete(knowledgeChunks).where(eq(knowledgeChunks.sourceFile, sourceFile));

        return NextResponse.json({ success: true });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error deleting knowledge:", message);
        return NextResponse.json(
            { error: "Failed to delete knowledge", details: message },
            { status: 500 }
        );
    }
}
