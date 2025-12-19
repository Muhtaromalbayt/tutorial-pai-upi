import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, siteSettings } from "@/lib/db/client";
import { sql } from "drizzle-orm";

export const runtime = "edge";

// GET settings
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        // Ensure table exists (create if not)
        await env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS site_settings (
                key TEXT PRIMARY KEY,
                value TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        const result = await db.select().from(siteSettings);

        // Convert array of {key, value} to single object
        const settings = result.reduce((acc: Record<string, string | null>, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        return NextResponse.json({ settings });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching settings:", message);
        return NextResponse.json(
            { error: "Failed to fetch settings", details: message },
            { status: 500 }
        );
    }
}

// POST/PUT update settings (bulk update)
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        // Ensure table exists (create if not)
        await env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS site_settings (
                key TEXT PRIMARY KEY,
                value TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        const body = await req.json() as Record<string, string>;
        const now = new Date().toISOString();

        // Use raw SQL for upsert since drizzle's onConflict needs more setup
        const stmt = env.DB.prepare(
            `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?) 
             ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
        );

        const batch = [];
        for (const [key, value] of Object.entries(body)) {
            batch.push(stmt.bind(key, value || "", now));
        }

        await env.DB.batch(batch);

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error updating settings:", message);
        return NextResponse.json(
            { error: "Failed to update settings", details: message },
            { status: 500 }
        );
    }
}
