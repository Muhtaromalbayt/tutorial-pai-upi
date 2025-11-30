import { NextRequest, NextResponse } from "next/server";
import { createAuth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const db = getRequestContext().env.DB;
        const auth = createAuth(db);

        const session = await auth.api.getSession({
            headers: req.headers,
        });

        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        return NextResponse.json({ user: session.user, session });
    } catch (error) {
        return NextResponse.json({ error: "Session check failed" }, { status: 500 });
    }
}
