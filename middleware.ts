import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // CMS auth is handled client-side via localStorage
    // No server-side protection needed for now
    return NextResponse.next();
}

export const config = {
    matcher: [],
};
