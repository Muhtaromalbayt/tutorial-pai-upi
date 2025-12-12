import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/simple-auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        await deleteSession();

        const response = NextResponse.json({ success: true });
        return response;
    } catch (error) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
