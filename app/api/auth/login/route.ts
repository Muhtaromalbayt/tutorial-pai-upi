import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { simpleAuth } from "@/lib/simple-auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as any;
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
        }

        const db = drizzle(getRequestContext().env.DB);

        // Find user
        const user = await db.select().from(users).where(eq(users.email, email)).get();

        if (!user) {
            return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
        }

        // Verify password
        const isValid = await simpleAuth.verifyPassword(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
        }

        // Create session
        const sessionId = await simpleAuth.createSession(user.id, db);

        // Set cookie
        const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
        response.cookies.set("session_id", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;

    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: error.message || "Login gagal" },
            { status: 500 }
        );
    }
}
