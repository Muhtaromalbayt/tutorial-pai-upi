import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

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

        // Create user using Better Auth
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
            headers: req.headers,
        });

        if (!result) {
            return NextResponse.json(
                { error: "Gagal membuat user admin" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, user: result.user });
    } catch (error: any) {
        console.error("Setup admin error:", error);
        return NextResponse.json(
            { error: error.message || "Terjadi kesalahan saat setup admin" },
            { status: 500 }
        );
    }
}
