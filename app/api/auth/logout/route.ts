import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { simpleAuth } from "@/lib/simple-auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const sessionId = req.cookies.get("session_id")?.value;

        if (sessionId) {
            const db = drizzle(getRequestContext().env.DB);
            await simpleAuth.deleteSession(sessionId, db);
        }

        const response = NextResponse.json({ success: true });
        response.cookies.delete("session_id");

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
