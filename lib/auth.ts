import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/lib/db/schema";

export const createAuth = (db: any) => betterAuth({
    database: drizzleAdapter(drizzle(db), {
        provider: "sqlite",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    trustedOrigins: ["http://localhost:3000", "http://localhost:3001", "https://tutorial-pai-upi.pages.dev"],
});

// Helper type for session
export type Session = typeof createAuth extends (db: any) => infer R ? (R extends { $Infer: { Session: infer S } } ? S : never) : never;
