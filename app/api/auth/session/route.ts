import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/simple-auth";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const sessionData = await getSession();

        if (!sessionData) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        return NextResponse.json({
            user: {
                id: sessionData.userId,
                name: sessionData.name,
                email: sessionData.email,
                role: sessionData.role
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Session check failed" }, { status: 500 });
    }
}
