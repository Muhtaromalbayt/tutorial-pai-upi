import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/simple-auth";
import { corsHeaders, handleCors, jsonWithCors } from "@/lib/cors";

export const runtime = "edge";

// Handle preflight request
export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get("origin");
    return handleCors(origin);
}

export async function POST(request: NextRequest) {
    const origin = request.headers.get("origin");

    try {
        await deleteSession();

        const response = NextResponse.json({
            success: true,
            message: "Logout berhasil",
        });

        // Add CORS headers
        const headers = corsHeaders(origin);
        Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return jsonWithCors(
            { error: "Terjadi kesalahan saat logout" },
            origin,
            500
        );
    }
}
