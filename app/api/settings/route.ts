import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Initialize table helper
async function ensureTableExists(db: any) {
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS site_settings (
            key TEXT PRIMARY KEY,
            value TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();
}

// GET settings
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        await ensureTableExists(db);

        const result = await db.prepare("SELECT * FROM site_settings").all();

        // Convert array of {key, value} to single object
        const settings = result.results.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        return NextResponse.json({ settings });
    } catch (error: any) {
        console.error("Error fetching settings:", error);
        return NextResponse.json(
            { error: "Failed to fetch settings", details: error.message },
            { status: 500 }
        );
    }
}

// POST/PUT update settings (bulk update)
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        await ensureTableExists(db);

        const body = await req.json() as Record<string, string>;
        const now = new Date().toISOString();

        // Transaction-like batch update
        const stmt = db.prepare(
            `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?) 
             ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
        );

        const batch = [];
        for (const [key, value] of Object.entries(body)) {
            batch.push(stmt.bind(key, value || "", now));
        }

        await db.batch(batch);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error updating settings:", error);
        return NextResponse.json(
            { error: "Failed to update settings", details: error.message },
            { status: 500 }
        );
    }
}
