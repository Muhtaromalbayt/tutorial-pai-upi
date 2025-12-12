import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession } from "@/lib/simple-auth";
import { corsHeaders, handleCors, jsonWithCors } from "@/lib/cors";

export const runtime = "edge";

// Temporary hardcoded admin for testing (remove in production)
const TEMP_ADMIN = {
    email: "alfath@upi.edu",
    password: "admin123",
    id: "admin-001",
    name: "Admin AL-FATH",
    role: "admin"
};

// Handle preflight request
export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get("origin");
    return handleCors(origin);
}

export async function POST(request: NextRequest) {
    const origin = request.headers.get("origin");

    try {
        const body = await request.json() as { email?: string; password?: string };
        const { email, password } = body;

        if (!email || !password) {
            return jsonWithCors(
                { error: "Email dan password harus diisi" },
                origin,
                400
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
                const db = drizzle(env.DB);

                const dbUser = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .get();

                if (dbUser) {
                    const isValid = await verifyPassword(password, dbUser.password);
                    if (isValid) {
                        user = {
                            id: dbUser.id,
                            email: dbUser.email,
                            name: dbUser.name,
                            role: dbUser.role || "admin"
                        };
                    }
                }
            } catch (error: any) {
                console.error("Database auth failed:", error);
            }
        }

        if (!user) {
            return jsonWithCors(
                { error: "Email atau password salah" },
                origin,
                401
            );
        }

        // Create session
        await createSession({
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });

        // Add CORS headers
        const headers = corsHeaders(origin);
        Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    } catch (error: any) {
        console.error("Login error:", error);
        return jsonWithCors(
            { error: "Terjadi kesalahan saat login" },
            origin,
            500
        );
    }
}
