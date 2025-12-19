import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import * as schema from './schema';

// Type for the database instance
export type DrizzleDB = ReturnType<typeof drizzleD1<typeof schema>>;

/**
 * Create a Drizzle database instance from Cloudflare D1
 * Use this in API routes and server components
 */
export function createDb(d1Database: D1Database): DrizzleDB {
    return drizzleD1(d1Database, { schema });
}

// Re-export all schema tables and types for convenience
export * from './schema';
