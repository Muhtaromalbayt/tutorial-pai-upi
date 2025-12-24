# 📖 Website Tutorial PAI–SPAI UPI — Summary

> **Kabinet AL-FATH** | Periode 2025/2026  
> **URL:** https://tutorialpaispai.bisma.online  
> **Tagline:** *Menumbuhkan Adab, Menggerakkan Peradaban*

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS |
| **Database** | Cloudflare D1 (SQLite) |
| **ORM** | Drizzle ORM |
| **Hosting** | Vercel + Cloudflare Workers |
| **AI Chatbot** | Groq LLM (Minral) |

---

## 📁 Struktur Project

```
tutorial-pai-upi/
├── app/
│   ├── api/              # API Routes (16 endpoints)
│   ├── cms/              # CMS Dashboard (10 modules)
│   ├── program/          # Program pages
│   ├── tentang/          # About pages
│   ├── kalender/         # Hijriah calendar
│   ├── kritik-saran/     # Feedback form
│   └── news/             # Kabar Tutorial
├── components/           # Reusable UI components
├── lib/
│   ├── db/               # Database schema & client
│   └── hijriah-calendar-data.ts
├── migrations/           # SQL migration files
├── public/assets/        # Static images
└── scripts/              # Seeder scripts
```

---

## 🌐 Halaman Publik

### Home (`/`)
- Hero section dengan aktivitas terkini
- Berita terbaru
- Quick links

### Tentang
| Route | Deskripsi |
|-------|-----------|
| `/tentang/kabinet` | Profil Kabinet AL-FATH |
| `/tentang/struktur` | Struktur kepengurusan (dari DB) |
| `/tentang/visi` | Visi Tutorial |
| `/tentang/misi` | Misi Tutorial |
| `/tentang/tujuan` | Tujuan Tutorial |
| `/tentang/sejarah` | Sejarah Tutorial |
| `/tentang/dosen` | Dosen Tutorial |
| `/tentang/program-pengurus/*` | Program internal pengurus |

### Program Tutorial
| Route | Deskripsi |
|-------|-----------|
| `/program/kuliah-dhuha` | Jadwal Kuliah Dhuha (dari DB) |
| `/program/mentoring` | Info Mentoring |
| `/program/bina-kader` | Bina Kader - Quick links & materi |
| `/program/seminar-pai` | Jadwal Seminar PAI (dari DB) |
| `/program/panitia-delegasi` | 🔒 Password protected - pembagian tugas |

### Lainnya
| Route | Deskripsi |
|-------|-----------|
| `/kalender` | Kalender Hijriah 1447 H (KHGT Muhammadiyah) |
| `/news` | Daftar berita |
| `/news/[id]` | Detail berita |
| `/kritik-saran` | Form feedback anonymous |

---

## 🔧 CMS (Content Management System)

Akses: `/cms/login` → `/cms/dashboard`

| Module | Route | Fungsi |
|--------|-------|--------|
| Kabar Tutorial | `/cms/kabar-tutorial` | CRUD berita |
| Kabinet/Pengurus | `/cms/kabinet` | Kelola anggota kepengurusan |
| Kalender | `/cms/kalender` | Kelola event kegiatan |
| Kuliah Dhuha | `/cms/kuliah-dhuha` | Kelola jadwal & pemateri |
| Seminar PAI | `/cms/seminar-pai` | Kelola jadwal seminar |
| Panitia Delegasi | `/cms/panitia-delegasi` | Kelola tugas delegasi Rabu/Jumat |
| Galeri | `/cms/galeri` | Kelola foto & dokumentasi |
| Knowledge Base | `/cms/knowledge` | Kelola data untuk chatbot Minral |
| Pengaturan | `/cms/pengaturan` | Edit hero & info situs |

---

## 🗄️ Database Schema

### Tabel Utama
| Tabel | Deskripsi |
|-------|-----------|
| `users` | User CMS & admin |
| `news` | Berita/artikel |
| `cabinet_members` | Anggota kepengurusan |
| `calendar_events` | Event kegiatan |
| `seminar_schedule` | Jadwal seminar PAI |
| `kuliah_dhuha_schedule` | Jadwal kuliah dhuha |
| `panitia_delegasi` | Panitia delegasi SPAI |
| `gallery_photos` | Foto dokumentasi |
| `feedback` | Kritik & saran |
| `knowledge_chunks` | Knowledge base untuk chatbot |
| `settings` | Pengaturan website |

---

## 🤖 Fitur AI: Minral Chatbot

- **Endpoint:** `/api/chat`
- **LLM Provider:** Groq (llama3.3-70b-versatile)
- **Knowledge Base:** D1 table `knowledge_chunks` dengan FTS
- **Floating Button:** Draggable di semua halaman

---

## 📡 API Endpoints

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET/POST/PUT/DELETE | `/api/news` | CRUD berita |
| GET/POST/PUT/DELETE | `/api/cabinet` | CRUD pengurus |
| GET/POST/PUT/DELETE | `/api/calendar` | CRUD event |
| GET/POST/PUT/DELETE | `/api/seminar` | CRUD seminar |
| GET/POST/PUT/DELETE | `/api/kuliah-dhuha` | CRUD kuliah dhuha |
| GET/POST/PUT/DELETE | `/api/panitia-delegasi` | CRUD panitia delegasi |
| GET/POST/PUT/DELETE | `/api/gallery` | CRUD foto galeri |
| GET/POST/PUT/DELETE | `/api/knowledge` | CRUD knowledge base |
| GET/PUT | `/api/settings` | Website settings |
| POST | `/api/feedback` | Submit kritik/saran |
| POST | `/api/chat` | AI chatbot |
| POST | `/api/auth/*` | Authentication |

---

## 🎨 Design System

- **Primary Color:** Red (#dc2626) — UPI Theme
- **Secondary:** Ocean Blue, Teal accents
- **Font Heading:** Plus Jakarta Sans
- **Font Body:** DM Sans
- **Hero Images:** `/assets/mentoring-hero.jpg`, `/assets/kuliah-dhuha-hero.jpg`

---

## 🚀 Deployment

### Development
```bash
npm install
npm run dev
```

### Production (Vercel)
1. Push ke GitHub
2. Vercel auto-deploy dari branch `main`

### Database Migration (Cloudflare D1)
```bash
npx wrangler d1 execute tutorial-pai-db --remote --file=./migrations/[file].sql
```

---

## 📞 Kontak

- **Email:** programtutorial@upi.edu
- **WhatsApp:** +62 851-6588-8607
- **Instagram:** @tutorialupi
- **YouTube:** Tutorial UPI
- **TikTok:** @tutorialupi

---

*© 2025 Tutorial PAI–SPAI UPI. Kabinet AL-FATH.*
