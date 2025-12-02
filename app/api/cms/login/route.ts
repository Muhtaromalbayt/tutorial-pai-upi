import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession } from "@/lib/simple-auth";

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

        // Get database - works in both dev and production
        let db;
        try {
            const { env } = getRequestContext();
            db = drizzle(env.DB);
        } catch {
            // Fallback for development
            if (process.env.NODE_ENV === "development") {
                return NextResponse.json(
                    { error: "Database belum dikonfigurasi. Gunakan wrangler dev untuk development." },
                    { status: 503 }
                );
            }
            throw new Error("Database not available");
        }

        // Find user by email
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .get();

        if (!user) {
            return NextResponse.json(
                { error: "Email atau password salah" },
                { status: 401 }
            );
        }

        // Verify password
        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
            return NextResponse.json(
                { error: "Email atau password salah" },
                { status: 401 }
            );
        }

        // Create session
        await createSession({
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role || "admin",
        });

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
        console.error("Login error details:", {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });

        return NextResponse.json(
            {
                error: "Terjadi kesalahan saat login",
                details: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
