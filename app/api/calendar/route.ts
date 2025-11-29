import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { calendarEvents } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const runtime = "edge";

// GET all events
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const events = await db
            .select()
            .from(calendarEvents)
            .orderBy(desc(calendarEvents.date))
            .all();

        return NextResponse.json({ events });
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
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { title, description, category, date, time, location } = body;

        const id = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const newEvent = await db
            .insert(calendarEvents)
            .values({
                id,
                title,
                description,
                category,
                date,
                time,
                location,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
            .returning();

        return NextResponse.json({ event: newEvent[0] });
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
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { id, title, description, category, date, time, location } = body;

        const updated = await db
            .update(calendarEvents)
            .set({
                title,
                description,
                category,
                date,
                time,
                location,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(calendarEvents.id, id))
            .returning();

        return NextResponse.json({ event: updated[0] });
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
        const db = drizzle(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(calendarEvents).where(eq(calendarEvents.id, id));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { error: "Failed to delete event", details: error.message },
            { status: 500 }
        );
    }
}
