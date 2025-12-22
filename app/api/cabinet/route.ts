import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { createDb, cabinetMembers } from "@/lib/db/client";
import { eq, asc } from "drizzle-orm";

export const runtime = "edge";

// GET all members
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = createDb(env.DB);

        const result = await db.select().from(cabinetMembers).orderBy(asc(cabinetMembers.orderIndex));

        return NextResponse.json({ members: result });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error fetching members:", message);
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
            name: string;
            position: string;
            division?: string;
            programStudi?: string;
            photoUrl?: string;
            email?: string;
            phone?: string;
            bio?: string;
            orderIndex?: number;
        };
        const { name, position, division, programStudi, photoUrl, email, phone, bio, orderIndex } = body;

        if (!name || !position) {
            return NextResponse.json(
                { error: "Name and position are required" },
                { status: 400 }
            );
        }

        const id = `cab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        await db.insert(cabinetMembers).values({
            id,
            name,
            position,
            division: division || null,
            programStudi: programStudi || null,
            photoUrl: photoUrl || null,
            email: email || null,
            phone: phone || null,
            bio: bio || null,
            orderIndex: orderIndex ? Number(orderIndex) : 0,
            createdAt: now,
            updatedAt: now,
        });

        return NextResponse.json({ success: true, id });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error creating member:", message);
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
            name: string;
            position: string;
            division?: string;
            programStudi?: string;
            photoUrl?: string;
            email?: string;
            phone?: string;
            bio?: string;
            orderIndex?: number;
        };
        const { id, name, position, division, programStudi, photoUrl, email, phone, bio, orderIndex } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Member ID is required" },
                { status: 400 }
            );
        }

        const now = new Date().toISOString();

        await db.update(cabinetMembers)
            .set({
                name,
                position,
                division: division || null,
                programStudi: programStudi || null,
                photoUrl: photoUrl || null,
                email: email || null,
                phone: phone || null,
                bio: bio || null,
                orderIndex: orderIndex ? Number(orderIndex) : 0,
                updatedAt: now,
            })
            .where(eq(cabinetMembers.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error updating member:", message);
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

        await db.delete(cabinetMembers).where(eq(cabinetMembers.id, id));

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error deleting member:", message);
        return NextResponse.json(
            { error: "Failed to delete member", details: message },
            { status: 500 }
        );
    }
}
