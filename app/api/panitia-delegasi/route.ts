import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, panitiaDelegasi } from "@/lib/db/client";
import { eq, and, asc, isNull } from "drizzle-orm";

export const runtime = "edge";

// GET all members (optionally filtered by day and week)
export async function GET(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const dayType = searchParams.get("day"); // 'rabu' or 'jumat'
        const weekNumber = searchParams.get("week"); // optional, for MC/Penyaji

        let query = db.select().from(panitiaDelegasi);

        if (dayType) {
            const members = await db.select().from(panitiaDelegasi)
                .where(eq(panitiaDelegasi.dayType, dayType))
                .orderBy(
                    asc(panitiaDelegasi.role),
                    asc(panitiaDelegasi.orderIndex)
                );
            return NextResponse.json({ members });
        }

        const members = await query.orderBy(
            asc(panitiaDelegasi.dayType),
            asc(panitiaDelegasi.role),
            asc(panitiaDelegasi.orderIndex)
        );

        return NextResponse.json({ members });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching panitia delegasi:", message);
        return NextResponse.json(
            { error: "Failed to fetch members", details: message },
            { status: 500 }
        );
    }
}

// POST new member
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            dayType: string;
            role: string;
            weekNumber?: number;
            name: string;
            gender?: string;
            phone?: string;
            orderIndex?: number;
        };

        const id = `pd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        const newMember = await db
            .insert(panitiaDelegasi)
            .values({
                id,
                dayType: body.dayType,
                role: body.role,
                weekNumber: body.weekNumber || null,
                name: body.name,
                gender: body.gender || "ikhwan",
                phone: body.phone || null,
                orderIndex: body.orderIndex || 0,
                createdAt: now,
                updatedAt: now,
            })
            .returning();

        return NextResponse.json({ member: newMember[0] });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error creating panitia delegasi:", message);
        return NextResponse.json(
            { error: "Failed to create member", details: message },
            { status: 500 }
        );
    }
}

// PUT update member
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const body = await req.json() as {
            id: string;
            dayType: string;
            role: string;
            weekNumber?: number;
            name: string;
            gender?: string;
            phone?: string;
            orderIndex?: number;
        };

        const now = new Date().toISOString();

        const updated = await db
            .update(panitiaDelegasi)
            .set({
                dayType: body.dayType,
                role: body.role,
                weekNumber: body.weekNumber || null,
                name: body.name,
                gender: body.gender || "ikhwan",
                phone: body.phone || null,
                orderIndex: body.orderIndex || 0,
                updatedAt: now,
            })
            .where(eq(panitiaDelegasi.id, body.id))
            .returning();

        return NextResponse.json({ member: updated[0] });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error updating panitia delegasi:", message);
        return NextResponse.json(
            { error: "Failed to update member", details: message },
            { status: 500 }
        );
    }
}

// DELETE member
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(panitiaDelegasi).where(eq(panitiaDelegasi.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error deleting panitia delegasi:", message);
        return NextResponse.json(
            { error: "Failed to delete member", details: message },
            { status: 500 }
        );
    }
}
