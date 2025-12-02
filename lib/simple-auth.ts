import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "cms_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionData {
    userId: string;
    email: string;
    name: string;
    role: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * Create a session cookie
 */
export async function createSession(sessionData: SessionData): Promise<void> {
    const cookieStore = await cookies();
    const sessionString = JSON.stringify(sessionData);
    const encodedSession = Buffer.from(sessionString).toString("base64");

    cookieStore.set(SESSION_COOKIE_NAME, encodedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/",
    });
}

/**
 * Get session data from cookie
 */
export async function getSession(): Promise<SessionData | null> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

        if (!sessionCookie?.value) {
            return null;
        }

        const sessionString = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
        const sessionData = JSON.parse(sessionString) as SessionData;

        return sessionData;
    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
}

/**
 * Delete session cookie
 */
export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Validate session and return user data
 */
export async function validateSession(): Promise<SessionData | null> {
    return getSession();
}
