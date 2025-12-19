import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, calendarEvents } from "@/lib/db/client";
import { eq, desc } from "drizzle-orm";

export const runtime = "edge";

// GET all events
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const result = await db.select().from(calendarEvents).orderBy(desc(calendarEvents.date));

        return NextResponse.json({ events: result });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching events:", message);
        return NextResponse.json(
            { error: "Failed to fetch events", details: message },
            { status: 500 }
        );
    }
}

// POST new event
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            title: string;
            description?: string;
            category?: string;
            date: string;
            time?: string;
            location?: string;
            imageUrl?: string;
        };
        const { title, description, category, date, time, location, imageUrl } = body;

        if (!title || !date) {
            return NextResponse.json(
                { error: "Title and date are required" },
                { status: 400 }
            );
        }

        const id = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        await db.insert(calendarEvents).values({
            id,
            title,
            description: description || null,
            category: category || "Kegiatan",
            date,
            time: time || null,
            location: location || null,
            imageUrl: imageUrl || null,
            createdAt: now,
            updatedAt: now,
        });

        return NextResponse.json({ success: true, id });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error creating event:", message);
        return NextResponse.json(
            { error: "Failed to create event", details: message },
            { status: 500 }
        );
    }
}

// PUT update event
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            id: string;
            title: string;
            description?: string;
            category?: string;
            date: string;
            time?: string;
            location?: string;
            imageUrl?: string;
        };
        const { id, title, description, category, date, time, location, imageUrl } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Event ID is required" },
                { status: 400 }
            );
        }

        const now = new Date().toISOString();

        await db.update(calendarEvents)
            .set({
                title,
                description: description || null,
                category,
                date,
                time: time || null,
                location: location || null,
                imageUrl: imageUrl || null,
                updatedAt: now,
            })
            .where(eq(calendarEvents.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error updating event:", message);
        return NextResponse.json(
            { error: "Failed to update event", details: message },
            { status: 500 }
        );
    }
}

// DELETE event
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(calendarEvents).where(eq(calendarEvents.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error deleting event:", message);
        return NextResponse.json(
            { error: "Failed to delete event", details: message },
            { status: 500 }
        );
    }
}
