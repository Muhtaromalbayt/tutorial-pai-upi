import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession } from "@/lib/simple-auth";

export const runtime = "edge";

// Fallback credentials for emergency access
const FALLBACK_EMAIL = "admin@upi.edu";
// Hash for "admin123"
const FALLBACK_HASH = "$2a$10$rKZxJxH5qZQJ5YqZQJ5YqOqZQJ5YqZQJ5YqZQJ5YqZQJ5YqZQJ5Yq";

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
        let dbError = null;

        // Try database authentication first
        try {
            // Get database - works in both dev and production
            let db;
            try {
                const { env } = getRequestContext();
                db = drizzle(env.DB);
            } catch (e: any) {
                // Fallback for development
                if (process.env.NODE_ENV === "development") {
                    throw new Error("Database not configured in dev");
                }
                throw e;
            }

            // Find user by email
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
            console.error("Database auth failed, attempting fallback:", error);
            dbError = error;
        }

        // If database auth failed or user not found/invalid, try fallback if DB error occurred
        if (!user && dbError) {
            console.log("Checking fallback credentials...");
            if (email === FALLBACK_EMAIL) {
                const isValid = await verifyPassword(password, FALLBACK_HASH);
                if (isValid) {
                    user = {
                        id: "admin-fallback",
                        email: FALLBACK_EMAIL,
                        name: "Admin (Fallback)",
                        role: "admin"
                    };
                    console.log("Fallback authentication successful");
                }
            }
        }

        if (!user) {
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
            role: user.role,
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
