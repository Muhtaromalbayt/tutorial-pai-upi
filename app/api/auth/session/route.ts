import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { simpleAuth } from "@/lib/simple-auth";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const sessionId = req.cookies.get("session_id")?.value;

        if (!sessionId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const db = drizzle(getRequestContext().env.DB);
        const sessionData = await simpleAuth.getSession(sessionId, db);

        if (!sessionData) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        return NextResponse.json({
            user: {
                id: sessionData.user.id,
                name: sessionData.user.name,
                email: sessionData.user.email,
                role: sessionData.user.role
            },
            session: sessionData.session
        });
    } catch (error) {
        return NextResponse.json({ error: "Session check failed" }, { status: 500 });
    }
}
