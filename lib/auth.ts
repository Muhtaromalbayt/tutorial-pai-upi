import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(drizzle(process.env.DB as any), {
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
    trustedOrigins: ["http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
