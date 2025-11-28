# Tutorial PAI - Admin Panel Setup Guide

## 🚀 Setup Backend & Database

### 1. Install Wrangler CLI (Cloudflare)
```bash
npm install -g wrangler
wrangler login
```

### 2. Create Cloudflare D1 Database
```bash
wrangler d1 create tutorial-pai-db
```

Copy the database ID yang muncul dan paste ke `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "tutorial-pai-db"
database_id = "paste-your-id-here"
```

### 3. Initialize Database Schema
```bash
wrangler d1 execute tutorial-pai-db --file=./database/schema.sql
```

### 4. Create First Admin User
```bash
wrangler d1 execute tutorial-pai-db --command="
INSERT INTO users (id, email, name, password, role) 
VALUES (
  'admin1', 
  'admin@upi.edu', 
  'Admin Tutorial', 
  'hashed-password-here',
  'admin'
);"
```

**PENTING:** Password harus di-hash dulu! Untuk testing, bisa pakai:
```bash
# Generate hashed password
npx bcrypt-cli hash yourpassword 10
```

### 5. Setup Environment Variables
Buat file `.env.local`:
```env
AUTH_SECRET=generate-random-secret-key-here
AUTH_URL=http://localhost:3000
```

Generate secret key:
```bash
openssl rand -base64 32
```

### 6. Run Development Server
```bash
npm run dev
```

---

## 🔐 Login ke Admin Panel

1. Buka browser: `http://localhost:3000/admin/login`
2. Login dengan:
   - Email: `admin@upi.edu`
   - Password: yang kamu set di step 4

---

## 📝 Cara Mengelola Konten

### Jadwal Kuliah Dhuha
1. Login ke admin panel
2. Klik menu "Kuliah Dhuha"
3. Klik "Tambah Jadwal Baru"
4. Isi form:
   - Minggu ke-
   - Tanggal
   - Topik
   - Pembicara
   - Materi (upload atau link)
   - Lokasi
5. Klik "Simpan"

### Calendar Events
1. Klik menu "Kalender & Events"
2. Klik "Tambah Event Baru"
3. Isi detail event
4. Pilih kategori (Kuliah Dhuha, Seminar, dll)
5. Simpan

### Berita & Pengumuman
1. Klik menu "Berita & Pengumuman"
2. Tambah berita baru
3. Tulis konten dengan rich text editor
4. Upload gambar cover
5. Publish atau save as draft

---

## 🚀 Deploy to Production

### Deploy to Cloudflare Pages
```bash
# Build the project
npm run build

# Deploy
wrangler pages deploy .next --project-name=tutorial-pai
```

### Update Environment Variables
Di Cloudflare Dashboard:
1. Go to Pages > tutorial-pai > Settings > Environment Variables
2. Add:
   - `AUTH_SECRET`: your-production-secret
   - `AUTH_URL`: https://your-domain.com
3. Bind D1 database ke project

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/session` - Check session
- `POST /api/auth/logout` - Logout

### Kuliah Dhuha
- `GET /api/kuliah-dhuha` - Get all schedules
- `POST /api/kuliah-dhuha` - Create schedule
- `PUT /api/kuliah-dhuha` - Update schedule
- `DELETE /api/kuliah-dhuha?id=xxx` - Delete schedule

### Calendar Events
- `GET /api/calendar` - Get events
- `POST /api/calendar` - Create event
- `PUT /api/calendar` - Update event
- `DELETE /api/calendar` - Delete event

---

## 🛠️ Troubleshooting

### "Database not found"
- Pastikan D1 database sudah dibuat
- Check `wrangler.toml` database_id sudah benar

### "Unauthorized"
- Check .env.local AUTH_SECRET sudah diset
- Pastikan admin user sudah dibuat di database

### Local Development Issues
- Gunakan `wrangler pages dev` untuk local testing dengan D1
- Atau gunakan D1 local mode:
```bash
wrangler d1 migrations apply tutorial-pai-db --local
```

---

Butuh bantuan? Contact: programtutorial@upi.edu
