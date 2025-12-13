import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifyPassword } from "@/lib/auth-edge";

export const runtime = "edge";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as { email?: string; password?: string };
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email dan password harus diisi" },
                { status: 400 }
            );
        }

        const { env } = getRequestContext();
        const db = env.DB;

        // Fetch user by email
        const user = await db.prepare(
            "SELECT * FROM users WHERE email = ?"
        ).bind(email).first();

        if (!user) {
            return NextResponse.json(
                { error: "Email atau password salah" },
                { status: 401 }
            );
        }

        // Verify password
        const storedPassword = user.password as string;
        const isValid = await verifyPassword(password, storedPassword);

        if (!isValid) {
            return NextResponse.json(
                { error: "Email atau password salah" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan saat login" },
            { status: 500 }
        );
    }
}
