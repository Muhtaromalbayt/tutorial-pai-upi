import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { simple_sessions, users } from "./db/schema";
import { eq } from "drizzle-orm";

// Web Crypto API for hashing
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const newHash = await hashPassword(password);
    return newHash === hash;
}

export const simpleAuth = {
    hashPassword,
    verifyPassword,

    async createSession(userId: string, db: any) {
        const sessionId = crypto.randomUUID();
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

        await db.insert(simple_sessions).values({
            id: sessionId,
            userId,
            expiresAt,
        });

        return sessionId;
    },

    async getSession(sessionId: string, db: any) {
        const result = await db.select({
            user: users,
            session: simple_sessions
        })
            .from(simple_sessions)
            .innerJoin(users, eq(simple_sessions.userId, users.id))
            .where(eq(simple_sessions.id, sessionId))
            .get();

        if (!result) return null;

        if (result.session.expiresAt < Date.now()) {
            await db.delete(simple_sessions).where(eq(simple_sessions.id, sessionId));
            return null;
        }

        return result;
    },

    async deleteSession(sessionId: string, db: any) {
        await db.delete(simple_sessions).where(eq(simple_sessions.id, sessionId));
    }
};
