import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
    try {
        // Step 1: Check if we can get the context
        let context;
        try {
            context = getRequestContext();
        } catch (e: any) {
            return NextResponse.json({
                step: "getRequestContext",
                error: e.message,
                stack: e.stack
            }, { status: 500 });
        }

        // Step 2: Check if env exists
        if (!context.env) {
            return NextResponse.json({
                step: "env check",
                error: "context.env is undefined",
                contextKeys: Object.keys(context)
            }, { status: 500 });
        }

        // Step 3: Check if DB exists
        if (!context.env.DB) {
            return NextResponse.json({
                step: "DB check",
                error: "context.env.DB is undefined",
                envKeys: Object.keys(context.env)
            }, { status: 500 });
        }

        // Step 4: Try a simple query
        const db = context.env.DB;
        let result;
        try {
            result = await db.prepare("SELECT 1 as test").first();
        } catch (e: any) {
            return NextResponse.json({
                step: "query",
                error: e.message,
                stack: e.stack
            }, { status: 500 });
        }

        // Step 5: Try to list tables
        let tables;
        try {
            tables = await db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
        } catch (e: any) {
            return NextResponse.json({
                step: "list tables",
                error: e.message,
                queryResult: result
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "All checks passed!",
            queryResult: result,
            tables: tables.results
        });

    } catch (error: any) {
        return NextResponse.json({
            step: "unknown",
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
