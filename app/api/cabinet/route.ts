import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// GET all members
export async function GET() {
    try {
        const { env } = getRequestContext();
        const db = env.DB;

        const result = await db.prepare(
            "SELECT * FROM cabinet_members ORDER BY order_index ASC"
        ).all();

        return NextResponse.json({ members: result.results });
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
        const db = env.DB;

        const body = await req.json() as any;
        const { name, position, division, photoUrl, email, phone, bio, orderIndex } = body;

        if (!name || !position) {
            return NextResponse.json(
                { error: "Name and position are required" },
                { status: 400 }
            );
        }

        const id = `cab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        await db.prepare(
            `INSERT INTO cabinet_members (id, name, position, division, photo_url, email, phone, bio, order_index, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            id,
            name,
            position,
            division || null,
            photoUrl || null,
            email || null,
            phone || null,
            bio || null,
            orderIndex ? Number(orderIndex) : 0,
            now,
            now
        ).run();

        return NextResponse.json({ success: true, id });
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
        const db = env.DB;

        const body = await req.json() as any;
        const { id, name, position, division, photoUrl, email, phone, bio, orderIndex } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Member ID is required" },
                { status: 400 }
            );
        }

        const now = new Date().toISOString();

        await db.prepare(
            `UPDATE cabinet_members SET name = ?, position = ?, division = ?, photo_url = ?, email = ?, phone = ?, bio = ?, order_index = ?, updated_at = ? WHERE id = ?`
        ).bind(
            name,
            position,
            division || null,
            photoUrl || null,
            email || null,
            phone || null,
            bio || null,
            orderIndex ? Number(orderIndex) : 0,
            now,
            id
        ).run();

        return NextResponse.json({ success: true });
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
        const db = env.DB;

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.prepare("DELETE FROM cabinet_members WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting member:", error);
        return NextResponse.json(
            { error: "Failed to delete member", details: error.message },
            { status: 500 }
        );
    }
}
