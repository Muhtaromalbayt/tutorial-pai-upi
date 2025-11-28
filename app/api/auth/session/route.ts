import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
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
