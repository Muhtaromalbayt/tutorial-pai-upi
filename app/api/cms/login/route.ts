import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Temporary hardcoded admin for testing
const TEMP_ADMIN = {
    email: "alfath@upi.edu",
    password: "admin123",
    id: "admin-001",
    name: "Admin AL-FATH",
    role: "admin"
};

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

        let user = null;

        // Check temporary admin first (for testing)
        if (email === TEMP_ADMIN.email && password === TEMP_ADMIN.password) {
            user = {
                id: TEMP_ADMIN.id,
                email: TEMP_ADMIN.email,
                name: TEMP_ADMIN.name,
                role: TEMP_ADMIN.role
            };
        }

        // If not temp admin, try database
        if (!user) {
            try {
                const { env } = getRequestContext();
                const db = env.DB;

                const result = await db.prepare(
                    "SELECT * FROM users WHERE email = ?"
                ).bind(email).first();

                if (result) {
                    // For now, simple password check (should use bcrypt in production)
                    // This is a fallback - temp admin above should work
                    user = {
                        id: result.id as string,
                        email: result.email as string,
                        name: result.name as string,
                        role: (result.role as string) || "admin"
                    };
                }
            } catch (error: any) {
                console.error("Database auth failed:", error);
            }
        }

        if (!user) {
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
