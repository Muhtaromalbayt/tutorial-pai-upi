import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as any;
        const { email, password } = body;

        // Use Better Auth to sign in
        const result = await auth.api.signInEmail({
            body: { email, password },
            headers: req.headers,
        });

        if (!result) {
            return NextResponse.json(
                { error: "Email atau password salah" },
                { status: 401 }
            );
        }

        return NextResponse.json({ success: true, user: result.user });
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: error.message || "Login gagal" },
            { status: 500 }
        );
    }
}
