# Tutorial PAI Website - README

## Deskripsi
Website resmi Tutorial PAI–SPAI UPI Semester Genap 2025/2026 — Kabinet AL-FATH

**Tagline:** Menumbuhkan Adab, Menggerakkan Peradaban

## Teknologi
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Date Handling:** date-fns
- **Design:** UPI-inspired (clean, academic, modern)

## Fitur Utama
1. **Home** - Hero section, berita terbaru, event terdekat
2. **Tentang** - Visi, Misi, Tujuan, Struktur, Kabinet, Dosen, Sejarah
3. **Program** - 5 program utama (Kuliah Dhuha, Seminar PAI, Mentoring, Bina Kader, Bina Mentor)
4. **Kalender Tutorial** - Interactive calendar dengan filter kategori dan detail event
5. **Program Pengurus** - 5 program internal kepengurusan

## Menjalankan Proyek

### Development
 \`\`\`bash
npm install
npm run dev
\`\`\`

Website akan berjalan di [http://localhost:3000](http://localhost:3000)

### Build Production
\`\`\`bash
npm run build
npm start
\`\`\`

## Struktur Folder
\`\`\`
/app
  /tentang
    /visi
    /misi
    /tujuan
    /struktur
    /kabinet
    /dosen
    /sejarah
    /program-pengurus
  /program
    /kuliah-dhuha
    /seminar-pai
    /mentoring
    /bina-kader
    /bina-mentor
  /kalender
/components
  - Header.tsx
  - Footer.tsx
  - Hero.tsx
  - Card.tsx
  - Button.tsx
/public
  /assets
    /logo
    /bg
    /pengurus
    /program
\`\`\`

## Desain & Branding
- **Warna Utama:** Blue (#0284c7) - NO PURPLE
- **Font:** Inter, Source Sans Pro
- **Style:** Clean, academic, professional (UPI-inspired)
- **Layout:** 12-column grid, responsive

## Kontak
- **Email:** tutorialpai@upi.edu
- **Lokasi:** Universitas Pendidikan Indonesia, Bandung

---
© 2025 Tutorial PAI–SPAI UPI. Kabinet AL-FATH.
