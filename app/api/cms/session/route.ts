import { NextResponse } from "next/server";
import { validateSession } from "@/lib/simple-auth";

export const runtime = "edge";

export async function GET() {
    try {
        const session = await validateSession();

        if (!session) {
            return NextResponse.json(
                { error: "Tidak ada sesi aktif" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: session.userId,
                email: session.email,
                name: session.name,
                role: session.role,
            },
        });
    } catch (error) {
        console.error("Session validation error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan saat validasi sesi" },
            { status: 500 }
        );
    }
}
