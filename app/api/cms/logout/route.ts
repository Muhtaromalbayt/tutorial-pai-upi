import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/simple-auth";

export const runtime = "edge";

export async function POST() {
    try {
        await deleteSession();

        return NextResponse.json({
            success: true,
            message: "Logout berhasil",
        });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan saat logout" },
            { status: 500 }
        );
    }
}
