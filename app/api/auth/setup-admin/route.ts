import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { hashPassword } from "@/lib/auth-edge";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const secret = searchParams.get("secret");

        if (secret !== "setup123") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { env } = getRequestContext();
        const db = env.DB;

        // Hash default password 'admin123'
        const hashedPassword = await hashPassword("admin123");

        // Update or insert admin user
        // Using "ON CONFLICT" if email is unique, OR just INSERT OR REPLACE
        // Assuming 'users' table exists and has id, email, password, name, role

        await db.prepare(`
            INSERT OR REPLACE INTO users (id, email, password, name, role, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
            "usr_admin",
            "alfath@upi.edu",
            hashedPassword,
            "Admin Alfath",
            "admin",
            new Date().toISOString()
        ).run();

        return NextResponse.json({
            success: true,
            message: "Admin password updated to secure hash",
            email: "alfath@upi.edu"
        });
    } catch (error: any) {
        console.error("Setup error:", error);
        return NextResponse.json(
            { error: "Setup failed", details: error.message },
            { status: 500 }
        );
    }
}
