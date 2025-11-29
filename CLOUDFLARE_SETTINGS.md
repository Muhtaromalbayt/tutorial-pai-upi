# ⚙️ Cloudflare Pages Configuration Guide

Deployment Anda gagal karena Cloudflare menggunakan pengaturan default Next.js yang tidak kompatibel dengan `next-on-pages`. Ikuti langkah ini untuk memperbaikinya:

## 1. Buka Cloudflare Dashboard
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Masuk ke menu **Workers & Pages**
3. Pilih project **tutorial-pai-upi**
4. Klik tab **Settings**

## 2. Update Build Configuration (PENTING!)
Di bagian **Build & deployments** > **Build configurations**, klik **Edit** dan isi:

| Setting | Value |
|---------|-------|
| **Framework preset** | `None` |
| **Build command** | `npm run pages:build` |
| **Build output directory** | `.vercel/output/static` |

> **Note:** Jangan pilih preset "Next.js". Pilih "None" agar kita bisa custom command.

## 3. Tambahkan Environment Variables
Di bagian **Environment variables**, tambahkan:

| Variable Name | Value |
|---------------|-------|
| `NODE_VERSION` | `18` |
| `BETTER_AUTH_SECRET` | (Isi dengan random string acak, contoh: `x8z...`) |
| `NEXT_PUBLIC_APP_URL` | `https://tutorial-pai-upi.pages.dev` |

## 4. Redeploy
1. Masuk ke tab **Deployments**
2. Klik titik tiga (...) di deployment terakhir
3. Pilih **Retry deployment**

---

Setelah ini, Cloudflare akan menggunakan perintah yang benar (`npm run pages:build`) dan deployment akan berhasil! 🚀
