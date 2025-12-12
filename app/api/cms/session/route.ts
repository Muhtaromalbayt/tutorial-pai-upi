import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/simple-auth";
import { corsHeaders, handleCors, jsonWithCors } from "@/lib/cors";

export const runtime = "edge";

// Handle preflight request
export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get("origin");
    return handleCors(origin);
}

export async function GET(request: NextRequest) {
    const origin = request.headers.get("origin");

    try {
        const session = await validateSession();

        if (!session) {
            return jsonWithCors(
                { error: "Tidak ada sesi aktif" },
                origin,
                401
            );
        }

        const response = NextResponse.json({
            success: true,
            user: {
                id: session.userId,
                email: session.email,
                name: session.name,
                role: session.role,
            },
        });

        // Add CORS headers
        const headers = corsHeaders(origin);
        Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    } catch (error) {
        console.error("Session validation error:", error);
        return jsonWithCors(
            { error: "Terjadi kesalahan saat validasi sesi" },
            origin,
            500
        );
    }
}
