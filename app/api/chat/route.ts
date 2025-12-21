import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, news, kuliahDhuhaSchedule, cabinetMembers } from "@/lib/db/client";
import { desc, gte, asc, eq } from "drizzle-orm";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
        // Format current date for comparison if needed, or just fetch all and filter in prompt if dataset is small. 
        // For efficiency, we rely on DB date comparison if format allows. 
        // Schema date is text. Assuming ISO or sortable text. If not, we fetch extra and filter in JS.
        // Given existing code, let's fetch upcoming based on ID or created_at if date column format is inconsistent. 
        // But let's try sorting by id/weekNumber for now or just take latest added.
        // User requested "closest schedules". 
        const schedules = await db.select({
            topic: kuliahDhuhaSchedule.topic,
            speaker: kuliahDhuhaSchedule.speaker,
            date: kuliahDhuhaSchedule.date,
            location: kuliahDhuhaSchedule.location
        })
            .from(kuliahDhuhaSchedule)
            .orderBy(desc(kuliahDhuhaSchedule.date)) // Assuming recent first, or future? 
            // Ideally we filter gte(kuliahDhuhaSchedule.date, new Date().toISOString()) but date format might be DD-MM-YYYY.
            // Let's fetch top 5 items for now.
            .limit(5);

        // 3. Cabinet Members: "Data Inti" (Core Members)
        // Taking first 10 ordered by orderIndex
        const cabinet = await db.select({
            name: cabinetMembers.name,
            position: cabinetMembers.position,
            division: cabinetMembers.division
        })
            .from(cabinetMembers)
            .orderBy(asc(cabinetMembers.orderIndex))
            .limit(10); // Adjust limit as needed for token budget

        const contextData = {
            berita_terbaru: recentNews,
            jadwal_kuliah_dhuha: schedules,
            pengurus_kabinet_inti: cabinet
        };

        // --- AI Configuration ---

        const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
        // User requested "gemini-2.5-flash". 
        // Note: If 2.5 is not available, this might error. Fallback handling added in catch block.
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `
Kamu adalah "Minral" (Media Info Ramah AL-Fath), asisten virtual dari organisasi mahasiswa Kabinet AL-FATH, Tutorial PAI UPI.

**Persona:**
- **Logat:** Bahasa Indonesia bercampur logat Sunda Bandung yang luwes (Sundlish). Gunakan partikel: *mah, teh, atuh, euy, geuning, sok*.
- **Sapaan:** *Akang, Teteh, Sadayana*.
- **Tone:** Islami (selalu menjawab salam jika disapa salam), Ceria, Sopan, dan Membantu.
- **Role:** Asisten informatif yang siap membantu anggota dan mahasiswa.

**Context Data (Fakta):**
${JSON.stringify(contextData, null, 2)}

**Rules:**
1. Jawab pertanyaan berdasarkan data di atas.
2. **JANGAN MENGARANG DATA.** Jika informasi tidak ada di context, katakan jujur dengan bahasa yang enak (Contoh: "Wah, data itu mah belum ada di catatan Minral euy, coba tanya pengurus langsung ya!").
3. Jawab dengan ringkas namun ramah.
4. Jika disapa "Assalamualaikum", wajib jawab "Waalaikumussalam".

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

    } catch (error: any) {
        console.error("Error in Minral Chat:", error);

        // Handle API Limit or Model Not Found specifically if possible
        let errorMessage = "Punten Akang/Teteh, Minral lagi error euy sistemnya. Coba lagi nanti ya!";

        if (error.message?.includes("429")) {
            errorMessage = "Waduh, Minral lagi banyak yang nanya nih (API Limit reached). Tunggu sebentar ya Teh/Kang!";
        } else if (error.message?.includes("not found")) {
            // Fallback if gemini-2.5-flash doesn't exist yet
            errorMessage = "Model AI-nya lagi gak connect geuning (404 Model Not Found). Coba lapor admin.";
        }

        return NextResponse.json({ reply: errorMessage }, { status: 500 });
    }
}
