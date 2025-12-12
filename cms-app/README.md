# CMS Tutorial PAI-SPAI UPI

Aplikasi CMS standalone untuk mengelola konten website Tutorial PAI-SPAI UPI.

## Tech Stack

- **React 18** - UI Library
- **TanStack Router** - File-based routing
- **TanStack Query** - Data fetching & caching
- **TailwindCSS** - Styling
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+
- Website utama berjalan di `http://localhost:3000` (untuk API)

### Installation

```bash
cd cms-app
npm install
```

### Development

```bash
npm run dev
```

CMS akan berjalan di `http://localhost:5173`

> **Note:** Pastikan website utama (`npm run dev` di folder utama) juga berjalan untuk API access.

### Build for Production

```bash
npm run build
```

## Routes

- `/login` - Halaman login CMS
- `/dashboard` - Dashboard overview
- `/kabar-tutorial` - Kelola berita dan pengumuman

## API Endpoints (dari website utama)

CMS app menggunakan API dari website utama:

- `POST /api/cms/login` - Authentication
- `GET /api/cms/session` - Check session
- `POST /api/cms/logout` - Logout
- `GET /api/news` - Get news list
- `POST /api/news` - Create news
- `PUT /api/news` - Update news
- `DELETE /api/news?id=xxx` - Delete news

## Deployment

CMS akan di-deploy ke subdomain terpisah (contoh: `cms.tutorial-pai.upi.edu`).

Untuk production, update `vite.config.ts` untuk proxy ke URL production API.
