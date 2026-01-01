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

// Helper function to extract text from PDF using pdf.js-extract approach
// Since we're in Edge runtime, we'll use a simpler text extraction method
async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
    // For Edge runtime, we'll use raw PDF text extraction
    // This is a simple approach that works for most text-based PDFs
    const uint8Array = new Uint8Array(buffer);
    const text = new TextDecoder("utf-8", { fatal: false }).decode(uint8Array);

    // Extract readable text from PDF stream
    // PDFs contain text in stream objects between 'stream' and 'endstream'
    const textMatches: string[] = [];

    // Method 1: Extract text from BT/ET blocks (text blocks in PDF)
    const btEtRegex = /BT[\s\S]*?ET/g;
    const blocks = text.match(btEtRegex) || [];

    for (const block of blocks) {
        // Extract text from Tj and TJ operators
        const tjMatches = block.match(/\(([^)]+)\)\s*Tj/g) || [];
        for (const match of tjMatches) {
            const extracted = match.match(/\(([^)]+)\)/);
            if (extracted && extracted[1]) {
                // Decode PDF text escapes
                let decoded = extracted[1]
                    .replace(/\\n/g, '\n')
                    .replace(/\\r/g, '\r')
                    .replace(/\\t/g, '\t')
                    .replace(/\\\(/g, '(')
                    .replace(/\\\)/g, ')')
                    .replace(/\\\\/g, '\\');
                textMatches.push(decoded);
            }
        }

        // Extract from TJ arrays
        const tjArrayMatches = block.match(/\[(.*?)\]\s*TJ/g) || [];
        for (const match of tjArrayMatches) {
            const arrayContent = match.match(/\[(.*?)\]/);
            if (arrayContent && arrayContent[1]) {
                const strings = arrayContent[1].match(/\(([^)]*)\)/g) || [];
                for (const str of strings) {
                    const inner = str.match(/\(([^)]*)\)/);
                    if (inner && inner[1]) {
                        textMatches.push(inner[1]);
                    }
                }
            }
        }
    }

    // Method 2: Also try to find raw text patterns
    const lines = text.split('\n');
    for (const line of lines) {
        // Skip binary/encoded lines
        if (line.includes('stream') || line.includes('endstream')) continue;
        if (line.match(/^[A-Za-z\s,.!?;:'"()-]+$/)) {
            // Looks like readable text
            if (line.length > 5 && line.length < 500) {
                textMatches.push(line);
            }
        }
    }

    // Join and clean up
    let extractedText = textMatches.join(' ')
        .replace(/\s+/g, ' ')
        .replace(/[^\x20-\x7E\u00A0-\u00FF\u0100-\u017F]/g, ' ')
        .trim();

    // If extraction is too short, return a warning
    if (extractedText.length < 50) {
        throw new Error("Tidak dapat mengekstrak teks dari PDF. Pastikan PDF berisi teks yang dapat dibaca (bukan scan/gambar).");
    }

    return extractedText;
}

// POST - Upload and process PDF
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "File PDF wajib diupload" },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.name.toLowerCase().endsWith('.pdf')) {
            return NextResponse.json(
                { error: "Hanya file PDF yang diperbolehkan" },
                { status: 400 }
            );
        }

        // Limit file size to 5MB
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "Ukuran file maksimal 5MB" },
                { status: 400 }
            );
        }

        const sourceFile = file.name;
        const arrayBuffer = await file.arrayBuffer();

        // Extract text from PDF
        let extractedText: string;
        try {
            extractedText = await extractTextFromPDF(arrayBuffer);
        } catch (extractError) {
            const errorMessage = extractError instanceof Error ? extractError.message : "Gagal mengekstrak teks dari PDF";
            return NextResponse.json(
                { error: errorMessage },
                { status: 400 }
            );
        }

        // Delete existing chunks from this source
        await db.delete(knowledgeChunks).where(eq(knowledgeChunks.sourceFile, sourceFile));

        // Split content into chunks
        const textChunks = splitIntoChunks(extractedText, 500);

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
            sourceFile,
            chunksCreated: textChunks.length,
            extractedLength: extractedText.length,
            message: `Berhasil memproses ${file.name} menjadi ${textChunks.length} chunks`
        });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error processing PDF:", message);
        return NextResponse.json(
            { error: "Gagal memproses PDF", details: message },
            { status: 500 }
        );
    }
}
