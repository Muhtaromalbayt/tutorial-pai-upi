import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { cabinetMembers } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export const runtime = "edge";

// GET all members
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const members = await db.select().from(cabinetMembers).orderBy(asc(cabinetMembers.orderIndex)).all();

        return NextResponse.json({ members });
    } catch (error: any) {
        console.error("Error fetching members:", error);
        return NextResponse.json(
            { error: "Failed to fetch members", details: error.message },
            { status: 500 }
        );
    }
}

// POST new member
export async function POST(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { name, position, division, photoUrl, email, phone, bio, orderIndex } = body;

        // Generate ID
        const id = `cab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const newMember = await db
            .insert(cabinetMembers)
            .values({
                id,
                name,
                position,
                division,
                photoUrl,
                email,
                phone,
                bio,
                orderIndex: orderIndex ? Number(orderIndex) : 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
            .returning();

        return NextResponse.json({ member: newMember[0] });
    } catch (error: any) {
        console.error("Error creating member:", error);
        return NextResponse.json(
            { error: "Failed to create member", details: error.message },
            { status: 500 }
        );
    }
}

// PUT update member
export async function PUT(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const body = await req.json() as any;
        const { id, name, position, division, photoUrl, email, phone, bio, orderIndex } = body;

        const updated = await db
            .update(cabinetMembers)
            .set({
                name,
                position,
                division,
                photoUrl,
                email,
                phone,
                bio,
                orderIndex: orderIndex ? Number(orderIndex) : 0,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(cabinetMembers.id, id))
            .returning();

        return NextResponse.json({ member: updated[0] });
    } catch (error: any) {
        console.error("Error updating member:", error);
        return NextResponse.json(
            { error: "Failed to update member", details: error.message },
            { status: 500 }
        );
    }
}

// DELETE member
export async function DELETE(req: NextRequest) {
    try {
        const { env } = getRequestContext();
        const db = drizzle(env.DB);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(cabinetMembers).where(eq(cabinetMembers.id, id));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting member:", error);
        return NextResponse.json(
            { error: "Failed to delete member", details: error.message },
            { status: 500 }
        );
    }
}
