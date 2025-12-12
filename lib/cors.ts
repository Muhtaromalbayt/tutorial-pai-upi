import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
    "https://tutorial-pai-cms.pages.dev",
    "http://localhost:5173",
    "http://localhost:3000"
];

export function corsHeaders(origin: string | null) {
    const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    return {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };
}

export function handleCors(origin: string | null) {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders(origin),
    });
}

export function jsonWithCors(data: any, origin: string | null, status = 200) {
    return NextResponse.json(data, {
        status,
        headers: corsHeaders(origin),
    });
}
