# CMS Development Setup

## Masalah

CMS memerlukan akses ke Cloudflare D1 database. Ketika menjalankan `npm run dev`, database tidak tersedia sehingga login akan error 500.

## Solusi: Gunakan Wrangler untuk Development

### Opsi 1: Wrangler Dev (Recommended)

```bash
npx wrangler dev
```

Atau tambahkan script di `package.json`:
```json
"scripts": {
  "dev:wrangler": "wrangler dev"
}
```

Kemudian jalankan:
```bash
npm run dev:wrangler
```

### Opsi 2: Wrangler Pages Dev

```bash
npm run build
npx wrangler pages dev .vercel/output/static
```

## Setup Database (Jika Belum Ada)

1. **Buat D1 Database**
   ```bash
   npx wrangler d1 create tutorial-pai-db
   ```

2. **Update wrangler.toml**
   Pastikan `wrangler.toml` sudah memiliki konfigurasi database:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "tutorial-pai-db"
   database_id = "your-database-id"
   ```

3. **Jalankan Migrasi**
   ```bash
   npx wrangler d1 execute tutorial-pai-db --file=database/schema.sql
   ```

4. **Buat Admin User**
   Buat file `create-admin.sql`:
   ```sql
   INSERT INTO users (id, email, name, password, role, created_at)
   VALUES (
     'admin-001',
     'admin@upi.edu',
     'Admin Tutorial PAI',
     '$2a$10$YourHashedPasswordHere',
     'admin',
     CURRENT_TIMESTAMP
   );
   ```

   Jalankan:
   ```bash
   npx wrangler d1 execute tutorial-pai-db --file=create-admin.sql
   ```

## Hash Password untuk Admin

Untuk membuat hash password, buat file `hash-password.js`:

```javascript
const bcrypt = require('bcryptjs');

const password = 'your-password-here';
const hash = bcrypt.hashSync(password, 10);
console.log('Hashed password:', hash);
```

Jalankan:
```bash
node hash-password.js
```

Copy hash yang dihasilkan dan gunakan di SQL INSERT statement.

## Testing CMS

1. Jalankan development server dengan wrangler:
   ```bash
   npx wrangler dev
   ```

2. Buka browser ke `http://localhost:8787/cms/login`

3. Login dengan credentials yang sudah dibuat

4. Kelola konten "Kabar Tutorial"

5. Cek hasil di home page `http://localhost:8787/`

## Catatan

- `npm run dev` (Next.js dev server) **TIDAK** bisa mengakses D1 database
- Harus menggunakan `wrangler dev` untuk development dengan database
- Untuk production, deploy ke Cloudflare Pages akan otomatis connect ke D1
