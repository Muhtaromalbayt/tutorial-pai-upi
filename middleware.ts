import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Protect /cms routes (except login)
    if (path.startsWith("/cms") && !path.startsWith("/cms/login")) {
        const sessionCookie = request.cookies.get("cms_session");

        if (!sessionCookie) {
            return NextResponse.redirect(new URL("/cms/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/cms/:path*"],
};
