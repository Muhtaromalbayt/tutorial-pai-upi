import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, binaMentorSchedule } from "@/lib/db/client";
import { eq, asc } from "drizzle-orm";

export const runtime = "edge";

// GET all schedules
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const schedules = await db.select().from(binaMentorSchedule).orderBy(asc(binaMentorSchedule.weekNumber));

        return NextResponse.json({ schedules });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching schedules:", message);
        return NextResponse.json(
            { error: "Failed to fetch schedules", details: message },
            { status: 500 }
        );
    }
}

// POST new schedule
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            weekNumber: number;
            date: string;
            topic: string;
            facilitator?: string;
            materials?: string[];
            location?: string;
        };
        const { weekNumber, date, topic, facilitator, materials, location } = body;

        const id = `bintor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        const newSchedule = await db
            .insert(binaMentorSchedule)
            .values({
                id,
                weekNumber: Number(weekNumber),
                date,
                topic,
                facilitator: facilitator || null,
                materials: JSON.stringify(materials || []),
                location: location || "Masjid Kampus UPI",
                createdAt: now,
                updatedAt: now,
            })
            .returning();

        return NextResponse.json({ schedule: newSchedule[0] });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error creating schedule:", message);
        return NextResponse.json(
            { error: "Failed to create schedule", details: message },
            { status: 500 }
        );
    }
}

// PUT update schedule
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            id: string;
            weekNumber: number;
            date: string;
            topic: string;
            facilitator?: string;
            materials?: string[];
            location?: string;
        };
        const { id, weekNumber, date, topic, facilitator, materials, location } = body;

        const now = new Date().toISOString();

        const updated = await db
            .update(binaMentorSchedule)
            .set({
                weekNumber: Number(weekNumber),
                date,
                topic,
                facilitator: facilitator || null,
                materials: JSON.stringify(materials || []),
                location: location || null,
                updatedAt: now,
            })
            .where(eq(binaMentorSchedule.id, id))
            .returning();

        return NextResponse.json({ schedule: updated[0] });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error updating schedule:", message);
        return NextResponse.json(
            { error: "Failed to update schedule", details: message },
            { status: 500 }
        );
    }
}

// DELETE schedule
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(binaMentorSchedule).where(eq(binaMentorSchedule.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error deleting schedule:", message);
        return NextResponse.json(
            { error: "Failed to delete schedule", details: message },
            { status: 500 }
        );
    }
}
