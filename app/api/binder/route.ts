import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { binderSchedule } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

// GET all schedules
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const schedules = await db.select().from(binderSchedule).all();

        return NextResponse.json({ schedules });
    } catch (error: any) {
        console.error("Error fetching schedules:", error);
        return NextResponse.json(
            { error: "Failed to fetch schedules", details: error.message },
            { status: 500 }
        );
    }
}

// POST new schedule
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { weekNumber, date, topic, facilitator, materials, location } = body;

        // Generate ID
        const id = `bin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const newSchedule = await db
            .insert(binderSchedule)
            .values({
                id,
                weekNumber: Number(weekNumber),
                date,
                topic,
                facilitator,
                materials: JSON.stringify(materials || []),
                location: location || "Masjid Kampus UPI",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
            .returning();

        return NextResponse.json({ schedule: newSchedule[0] });
    } catch (error: any) {
        console.error("Error creating schedule:", error);
        return NextResponse.json(
            { error: "Failed to create schedule", details: error.message },
            { status: 500 }
        );
    }
}

// PUT update schedule
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { id, weekNumber, date, topic, facilitator, materials, location } = body;

        const updated = await db
            .update(binderSchedule)
            .set({
                weekNumber: Number(weekNumber),
                date,
                topic,
                facilitator,
                materials: JSON.stringify(materials || []),
                location,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(binderSchedule.id, id))
            .returning();

        return NextResponse.json({ schedule: updated[0] });
    } catch (error: any) {
        console.error("Error updating schedule:", error);
        return NextResponse.json(
            { error: "Failed to update schedule", details: error.message },
            { status: 500 }
        );
    }
}

// DELETE schedule
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(binderSchedule).where(eq(binderSchedule.id, id));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting schedule:", error);
        return NextResponse.json(
            { error: "Failed to delete schedule", details: error.message },
            { status: 500 }
        );
    }
}
