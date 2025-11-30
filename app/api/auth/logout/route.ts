import { NextRequest, NextResponse } from "next/server";
import { createAuth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const db = getRequestContext().env.DB;
        const auth = createAuth(db);

        await auth.api.signOut({
            headers: req.headers,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
