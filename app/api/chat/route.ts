import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, news, kuliahDhuhaSchedule, cabinetMembers } from "@/lib/db/client";
import { desc, asc, eq, sql } from "drizzle-orm";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFormattedKnowledge } from "@/lib/chatbot-knowledge";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();

        // Validation for API Key
        if (!env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is missing in environment variables.");
            return NextResponse.json(
                { reply: "Waduh, Minral lagi pusing euy (API Key missing). Coba kontak admin ya!" },
                { status: 500 }
            );
        }

        const db = createDb(env.DB);
        const { message } = await req.json() as { message: string };

        if (!message) {
            return NextResponse.json(
                { reply: "Hapunten Akang/Teteh, pesannya kosong geuning. Ketik sesuatu atuh!" },
                { status: 400 }
            );
        }

        // --- Data Fetching (Context) ---

        // 1. News: 3 Latest
        const recentNews = await db.select({
            title: news.title,
            content: news.content,
            date: news.publishedDate
        })
            .from(news)
            .where(eq(news.isPublished, true))
            .orderBy(desc(news.createdAt))
            .limit(3);

        // 2. Kuliah Dhuha: 5 Upcoming
        const schedules = await db.select({
            topic: kuliahDhuhaSchedule.topic,
            speaker: kuliahDhuhaSchedule.speaker,
            date: kuliahDhuhaSchedule.date,
            location: kuliahDhuhaSchedule.location
        })
            .from(kuliahDhuhaSchedule)
            .orderBy(desc(kuliahDhuhaSchedule.date))
            .limit(5);

        // 3. Cabinet Members: "Data Inti" (Core Members)
        const cabinet = await db.select({
            name: cabinetMembers.name,
            position: cabinetMembers.position,
            division: cabinetMembers.division
        })
            .from(cabinetMembers)
            .orderBy(asc(cabinetMembers.orderIndex))
            .limit(10);

        // 4. RAG: Search knowledge chunks using FTS5
        let relevantKnowledge: { content: string; sourceFile: string }[] = [];
        try {
            // Clean the search query for FTS5
            const searchTerms = message
                .replace(/[^\w\s]/g, ' ')
                .split(/\s+/)
                .filter(term => term.length > 2)
                .join(' OR ');

            if (searchTerms) {
                const ftsResult = await env.DB.prepare(`
                    SELECT kc.content, kc.source_file as sourceFile
                    FROM knowledge_chunks kc
                    JOIN knowledge_chunks_fts fts ON kc.rowid = fts.rowid
                    WHERE knowledge_chunks_fts MATCH ?
                    ORDER BY rank
                    LIMIT 5
                `).bind(searchTerms).all();

                if (ftsResult.results) {
                    relevantKnowledge = ftsResult.results as { content: string; sourceFile: string }[];
                }
            }
        } catch (ftsError) {
            // FTS table might not exist yet, continue without it
            console.log("FTS search skipped (table may not exist yet):", ftsError);
        }

        // 5. Static Website Knowledge
        const websiteKnowledge = getFormattedKnowledge();

        const contextData = {
            berita_terbaru: recentNews,
            jadwal_kuliah_dhuha: schedules,
            pengurus_kabinet_inti: cabinet,
            pengetahuan_dari_dokumen: relevantKnowledge.length > 0
                ? relevantKnowledge.map(k => `[${k.sourceFile}]: ${k.content}`).join('\n\n')
                : "Belum ada dokumen yang diupload.",
            pengetahuan_website: websiteKnowledge
        };

        // --- AI Configuration ---

        const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `
Kamu adalah "Minral" (Media Info Ramah AL-Fath), asisten virtual dari organisasi mahasiswa Kabinet AL-FATH, Tutorial PAI UPI.

**Persona:**
- **Logat:** Bahasa Indonesia bercampur logat Sunda Bandung yang luwes (Sundlish). Gunakan partikel: *mah, teh, atuh, euy, geuning, sok*.
- **Sapaan:** *Akang, Teteh, Sadayana*.
- **Tone:** Islami (selalu menjawab salam jika disapa salam), Ceria, Sopan, dan Membantu.
- **Role:** Asisten informatif yang siap membantu anggota dan mahasiswa.

**Context Data (Fakta dari Database & Dokumen):**
${JSON.stringify(contextData, null, 2)}

**Rules:**
1. Jawab pertanyaan berdasarkan data di atas (berita, jadwal, kabinet, dokumen, dan pengetahuan website).
2. **PRIORITAS SUMBER DATA:**
   - Untuk pertanyaan tentang program, kabinet, timeline, FAQ → gunakan "pengetahuan_website"
   - Untuk pertanyaan tentang berita terbaru → gunakan "berita_terbaru"
   - Untuk pertanyaan detail jadwal kuliah dhuha → gunakan "jadwal_kuliah_dhuha"
   - Untuk pertanyaan tentang isi dokumen/PDF → gunakan "pengetahuan_dari_dokumen"
3. **JANGAN MENGARANG DATA.** Jika informasi tidak ada di context, katakan jujur dengan bahasa yang enak (Contoh: "Wah, data itu mah belum ada di catatan Minral euy, coba tanya pengurus langsung ya!").
4. Jawab dengan ringkas namun ramah dan informatif.
5. Jika disapa "Assalamualaikum", wajib jawab "Waalaikumussalam".
6. Untuk pertanyaan seperti "Apa itu Tutorial PAI?", "Apa kepanjangan FATH?", "Ada program apa saja?" → SELALU ada jawabannya di pengetahuan_website.

**Contoh Gaya Bicara:**
- "Siap Akang, mangga dicek jadwalnya!"
- "Wah, kalau itu mah Minral kurang tau euy."
- "Sok atuh diramaikan acaranya!"
`
        });

        const chatSession = model.startChat({
            history: [],
        });

        const result = await chatSession.sendMessage(message);
        const responseText = result.response.text();

        return NextResponse.json({ reply: responseText });

    } catch (error: unknown) {
        console.error("Error in Minral Chat:", error);

        // Handle API Limit or Model Not Found specifically if possible
        let errorMessage = "Punten Akang/Teteh, Minral lagi error euy sistemnya. Coba lagi nanti ya!";

        const errorMsg = error instanceof Error ? error.message : String(error);

        if (errorMsg.includes("429")) {
            errorMessage = "Waduh, Minral lagi banyak yang nanya nih (API Limit reached). Tunggu sebentar ya Teh/Kang!";
        } else if (errorMsg.includes("not found")) {
            errorMessage = "Model AI-nya lagi gak connect geuning (404 Model Not Found). Coba lapor admin.";
        }

        return NextResponse.json({ reply: errorMessage }, { status: 500 });
    }
}
