import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@/lib/db/schema";
import { simpleAuth } from "@/lib/simple-auth";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as any;
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Nama, email, dan password wajib diisi" },
                { status: 400 }
            );
        }

        const db = drizzle(getRequestContext().env.DB);

        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
        if (existingUser) {
            // Update existing user password
            const hashedPassword = await simpleAuth.hashPassword(password);
            await db.update(users).set({ password: hashedPassword, name, role: 'admin' }).where(eq(users.email, email));
            return NextResponse.json({ success: true, message: "Admin updated" });
        }

        // Create new user
        const hashedPassword = await simpleAuth.hashPassword(password);
        const userId = crypto.randomUUID();

        await db.insert(users).values({
            id: userId,
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        return NextResponse.json({ success: true, user: { id: userId, name, email } });
    } catch (error: any) {
        console.error("Setup admin error:", error);
        return NextResponse.json(
            { error: error.message || "Terjadi kesalahan saat setup admin" },
            { status: 500 }
        );
    }
}
