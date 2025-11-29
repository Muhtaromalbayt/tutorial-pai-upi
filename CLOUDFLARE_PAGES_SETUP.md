# 🚨 Critical Deployment Fix: Use Cloudflare Pages

The deployment logs indicate that you have likely created a **Cloudflare Worker** project instead of a **Cloudflare Pages** project. 

- **Error:** `[ERROR] Missing entry-point to Worker script`
- **Cause:** The system is trying to deploy your app as a simple Worker (`wrangler deploy`), but this is a Next.js application that requires a specific build process (`next-on-pages`).

## ✅ Solution: Create a Cloudflare Pages Project

Please follow these steps exactly to deploy your application:

### 1. Delete the Incorrect Project (Optional but Recommended)
If you created a project in Cloudflare Workers & Pages that is failing, you can delete it to avoid confusion.

### 2. Create a New Pages Project
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages**.
3. Click **Create application**.
4. Click on the **Pages** tab (Important!).
5. Click **Connect to Git**.
6. Select your repository (`tutorial-pai-upi`).

### 3. Configure Build Settings (CRITICAL)
In the "Set up builds and deployments" screen, use these **exact** settings:

| Setting | Value |
|---------|-------|
| **Framework preset** | `Next.js` |
| **Build command** | `npm run pages:build` |
| **Build output directory** | `.vercel/output/static` |

> **Note:** Do NOT use `npm run build`. You MUST use `npm run pages:build`.

### 4. Add Environment Variables
Add the following environment variables in the setup screen:

- `NODE_VERSION`: `18` (or `20`)
- `COMPATIBILITY_DATE`: `2024-01-01`
- `BETTER_AUTH_SECRET`: Generate a random string (e.g., using `openssl rand -base64 32`) and paste it here.
- `NEXT_PUBLIC_APP_URL`: Your Pages URL (e.g., `https://tutorial-pai-upi.pages.dev`)

### 5. Save and Deploy
Click **Save and Deploy**.

---

## 🔧 Post-Deployment Setup (D1 Database)

Once the project is created, you need to connect your D1 database:

1. Go to your new Pages project in the dashboard.
2. Go to **Settings** -> **Functions**.
3. Scroll down to **D1 Database Bindings**.
4. Click **Add binding**.
5. **Variable name:** `DB` (Must be exactly `DB`).
6. **D1 database:** Select `tutorial-pai-db`.
7. Click **Save**.
8. Go to the **Deployments** tab and **Retry** the latest deployment to apply the database binding.

---

## ❓ Why did it fail before?
The logs showed:
```
Executing user build command: npm run build
Executing user deploy command: npx wrangler deploy
```
This means it was running a standard Next.js build (which doesn't work on Cloudflare) and then trying to deploy it as a Worker without an entry point. The instructions above switch to the correct **Pages** workflow.
