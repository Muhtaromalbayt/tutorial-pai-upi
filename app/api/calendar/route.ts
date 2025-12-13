import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// GET all events
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const result = await db.prepare(
            "SELECT * FROM calendar_events ORDER BY date DESC"
        ).all();

        return NextResponse.json({ events: result.results });
    } catch (error: any) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events", details: error.message },
            { status: 500 }
        );
    }
}

// POST new event
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const body = await req.json() as any;
        const { title, description, category, date, time, location, imageUrl } = body;

        if (!title || !date) {
            return NextResponse.json(
                { error: "Title and date are required" },
                { status: 400 }
            );
        }

        const id = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        await db.prepare(
            `INSERT INTO calendar_events (id, title, description, category, date, time, location, image_url, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            id,
            title,
            description || null,
            category || "Kegiatan",
            date,
            time || null,
            location || null,
            imageUrl || null,
            now,
            now
        ).run();

        return NextResponse.json({ success: true, id });
    } catch (error: any) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event", details: error.message },
            { status: 500 }
        );
    }
}

// PUT update event
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const body = await req.json() as any;
        const { id, title, description, category, date, time, location, imageUrl } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Event ID is required" },
                { status: 400 }
            );
        }

        const now = new Date().toISOString();

        await db.prepare(
            `UPDATE calendar_events SET title = ?, description = ?, category = ?, date = ?, time = ?, location = ?, image_url = ?, updated_at = ? WHERE id = ?`
        ).bind(
            title,
            description || null,
            category,
            date,
            time || null,
            location || null,
            imageUrl || null,
            now,
            id
        ).run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error updating event:", error);
        return NextResponse.json(
            { error: "Failed to update event", details: error.message },
            { status: 500 }
        );
    }
}

// DELETE event
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.prepare("DELETE FROM calendar_events WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { error: "Failed to delete event", details: error.message },
            { status: 500 }
        );
    }
}
