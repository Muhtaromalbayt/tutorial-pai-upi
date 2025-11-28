/// <reference types="@cloudflare/workers-types" />

declare module '@cloudflare/next-on-pages' {
    interface CloudflareEnv {
        DB: D1Database;
        // Add other bindings here if needed
        // KV: KVNamespace;
        // R2: R2Bucket;
    }
}
