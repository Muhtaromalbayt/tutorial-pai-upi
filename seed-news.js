const Database = require('better-sqlite3');
const db = new Database('./sqlite.db');

console.log('\n🌱 Seeding dummy news...\n');

const genId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const now = new Date().toISOString();

const newsItems = [
    {
        title: 'Ribuan Mahasiswa Ikuti Kuliah Dhuha Perdana',
        category: 'Kegiatan',
        content: `
# Ribuan Mahasiswa Padati Masjid Al-Furqan

**Bandung, 17 Februari 2025** - Ribuan mahasiswa Universitas Pendidikan Indonesia (UPI) memadati Masjid Al-Furqan untuk mengikuti Kuliah Dhuha perdana di semester genap tahun ajaran 2025/2026. Kegiatan ini menjadi awal dari rangkaian program Tutorial PAI yang wajib diikuti oleh seluruh mahasiswa yang mengontrak mata kuliah PAI.

Pemateri kali ini, **Ust. Ahmad Fauzi, M.Pd.I**, menyampaikan materi tentang "Adab Menuntut Ilmu". Beliau menekankan pentingnya niat yang lurus dan akhlak yang mulia dalam proses pencarian ilmu.

> "Ilmu tanpa adab ibarat pohon tanpa buah. Keberkahan ilmu terletak pada seberapa besar rasa hormat kita kepada ilmu dan guru," ujar Ust. Ahmad Fauzi.

Para peserta tampak antusias mengikuti jalannya acara. Sesi tanya jawab pun berlangsung interaktif dengan banyaknya mahasiswa yang mengajukan pertanyaan seputar tantangan menuntut ilmu di era digital.

Semoga kegiatan ini menjadi pemantik semangat bagi seluruh mahasiswa UPI untuk terus belajar dan memperbaiki diri.
        `,
        image_url: '/assets/kegiatan/kuliah-dhuha.png',
        author: 'Tim Humas Tutorial'
    },
    {
        title: 'Open Recruitment Mentor Tutorial PAI 2025 Dibuka!',
        category: 'Pengumuman',
        content: `
# Panggilan untuk Calon Mentor PAI!

**Apakah Anda mahasiswa yang ingin berkontribusi dalam dakwah kampus?**
**Ingin melatih soft skill kepemimpinan dan komunikasi?**

Tutorial PAI UPI kembali membuka kesempatan bagi mahasiswa aktif UPI angkatan 2023 dan 2024 untuk bergabung menjadi **Mentor Tutorial PAI**.

### Persyaratan:
- Mahasiswa aktif UPI (maksimal semester 6)
- Lulus Tutorial PAI dengan nilai minimal A
- Berkomitmen tinggi dan bertanggung jawab
- Memiliki bacaan Al-Qur'an yang baik
- Siap mengikuti rangkaian pembinaan

### Benefit:
- Sertifikat
- Pelatihan intensif (Public Speaking, Leadership, Fiqih Dakwah)
- Relasi luas
- Amal jariyah

**Timeline Pendaftaran:**
- Pendaftaran: 20 - 30 Januari 2025
- Wawancara: 1 - 5 Februari 2025
- Pengumuman: 7 Februari 2025

Segera daftarkan diri Anda di [bit.ly/DaftarMentorPAI2025](https://bit.ly/DaftarMentorPAI2025). 
Jangan lewatkan kesempatan emas ini!
        `,
        image_url: '/assets/kegiatan/oprec-mentor.png',
        author: 'Panitia Oprec'
    },
    {
        title: 'Pentingnya Pendidikan Karakter di Era Digital',
        category: 'Artikel',
        content: `
Di tengah pesatnya perkembangan teknologi informasi, **pendidikan karakter** menjadi semakin krusial. Era digital membawa arus informasi yang begitu deras, yang jika tidak disikapi dengan bijak, dapat menggerus nilai-nilai moral generasi muda.

Tutorial PAI UPI hadir sebagai salah satu benteng pertahanan moral mahasiswa. Melalui program-program seperti Mentoring dan Kuliah Dhuha, mahasiswa tidak hanya diajarkan tentang ritual ibadah, tetapi juga bagaimana berinteraksi dengan sesama, menghormati perbedaan, dan menjaga integritas diri.

### Tantangan Generasi Z
Generasi Z dikenal sebagai *digital native*. Namun, kemudahan akses informasi seringkali membuat mereka rentan terhadap:
1. Hoax dan disinformasi
2. Cyberbullying
3. Pergaulan bebas digital
4. Krisis identitas

Oleh karena itu, penanaman nilai-nilai Islam yang *rahmatan lil alamin* menjadi sangat relevan. Islam mengajarkan *tabayyun* (check and recheck), *akhlakul karimah* (etika mulia), dan *ukhuwah* (persaudaraan).

Mari bersama-sama membangun generasi yang tidak hanya cerdas intelektual, tetapi juga anggun dalam moral dan spiritual.
        `,
        image_url: '/assets/kegiatan/seminar-pai.png',
        author: 'Dr. H. Aam Amiruddin'
    },
    {
        title: 'Jadwal Terbaru Tutorial PAI Semester Genap',
        category: 'Info',
        content: `
Diberitahukan kepada seluruh mahasiswa peserta Tutorial PAI SPAI Semester Genap 2025/2026, berikut adalah jadwal rangkaian kegiatan yang perlu diperhatikan:

### 1. Kuliah Dhuha
Dilaksanakan setiap hari **Sabtu**, pukul **07.30 - 09.00 WIB** di Masjid Al-Furqan UPI. Wajib membawa Al-Qur'an dan mengenakan busana muslim/muslimah yang rapi.

### 2. Mentoring Kelompok
Jadwal mentoring kelompok bersifat fleksibel sesuai kesepakatan dengan mentor masing-masing, namun wajib dilaksanakan **satu pekan sekali** dengan durasi minimal 60 menit.

### 3. Seminar PAI
Seminar PAI akan dilaksanakan pada pertengahan semester. Pastikan Anda sudah mendaftar melalui website ini pada menu **Tutorial SPAI > Seminar PAI**.

### 4. Bina Kader
Program khusus bagi mahasiswa yang berminat mendalami keislaman lebih lanjut. Seleksi akan dimulai bulan Maret 2025.

Selalu pantau informasi terbaru melalui website ini dan media sosial resmi Tutorial PAI UPI.
        `,
        image_url: '/assets/kegiatan/program-unggulan.png',
        author: 'Admin Akademik'
    },
    {
        title: 'Antusiasme Peserta Seminar PAI Membludak',
        category: 'Kegiatan',
        content: `
Gedung Kebudayaan Amphitheater UPI dipadati oleh peserta Seminar PAI yang diselenggarakan pada Sabtu lalu. Seminar bertajuk **"Membangun Peradaban dengan Al-Qur'an"** ini menghadirkan pembicara nasional yang sangat inspiratif.

Panitia mencatat lebih dari **1.500 peserta** hadir, melebihi kapasitas gedung yang tersedia. Untuk mengantisipasi hal tersebut, panitia menyediakan layar lebar di area luar gedung agar peserta yang tidak tertampung tetap dapat mengikuti materi.

"Kami sangat bersyukur atas antusiasme teman-teman mahasiswa. Ini menunjukkan bahwa semangat belajar agama di kalangan mahasiswa UPI sangat tinggi," ujar Ketua Pelaksana, Rian Hidayat.

Acara ditutup dengan doa bersama dan pembagian doorprize menarik bagi peserta yang beruntung. Sampai jumpa di seminar berikutnya!
        `,
        image_url: '/assets/assets/kuliah-dhuha-hero.jpg',
        author: 'Reporter Kampus'
    }
];

newsItems.forEach(n => {
    // Check if item already exists to avoid duplicates (optional, but good practice)
    const exists = db.prepare('SELECT id FROM news WHERE title = ?').get(n.title);

    if (!exists) {
        db.prepare(`
            INSERT INTO news (id, title, content, category, image_url, author, published_date, is_published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            genId('news'),
            n.title,
            n.content,
            n.category,
            n.image_url,
            n.author,
            now.split('T')[0],
            1, // is_published = true
            now,
            now
        );
        console.log(`   ✓ Created: ${n.title}`);
    } else {
        console.log(`   ⚠️ Skipped (already exists): ${n.title}`);
    }
});

console.log('\n✅ Dummy news seeding completed!');
db.close();
