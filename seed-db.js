// Script untuk mengisi database dengan data sample
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('./sqlite.db');

console.log('\n🌱 Seeding database...\n');

// Helper untuk generate ID
const genId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const now = new Date().toISOString();

// 1. Seed Admin User
console.log('👤 Creating admin user...');
const hashedPassword = bcrypt.hashSync('admin123', 10);
db.prepare(`
    INSERT OR REPLACE INTO users (id, email, name, password, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
`).run('admin_1', 'admin@tutorial-pai.upi.edu', 'Admin Tutorial', hashedPassword, 'admin', now);
console.log('   ✓ Admin: admin@tutorial-pai.upi.edu / admin123');

// 2. Seed Calendar Events
console.log('\n📅 Creating calendar events...');
const events = [
    { title: 'Kuliah Dhuha: Adab Menuntut Ilmu', category: 'Kajian', date: '2025-02-22', time: '07:30 - 09:00 WIB', location: 'Auditorium FPIPS UPI' },
    { title: 'Seminar PAI: Pendidikan Karakter', category: 'Seminar', date: '2025-03-01', time: '09:00 - 12:00 WIB', location: 'Gedung FIP UPI' },
    { title: 'Mentoring Kelompok Batch 1', category: 'Program', date: '2025-03-05', time: '15:30 - 17:00 WIB', location: 'Masjid Kampus UPI' },
    { title: 'Bina Kader: Leadership Training', category: 'BINDER', date: '2025-03-10', time: '08:00 - 16:00 WIB', location: 'Aula PKM UPI' },
    { title: 'Rihlah Tarbawiyah', category: 'Rihlah', date: '2025-03-15', time: 'Full Day', location: 'Kawah Putih, Ciwidey' },
];
events.forEach(e => {
    db.prepare(`
        INSERT INTO calendar_events (id, title, description, category, date, time, location, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(genId('evt'), e.title, `Deskripsi ${e.title}`, e.category, e.date, e.time, e.location, now, now);
});
console.log(`   ✓ ${events.length} events created`);

// 3. Seed News
console.log('\n📰 Creating news articles...');
const newsItems = [
    { title: 'Pembukaan Tutorial PAI Semester Genap 2025/2026', category: 'Pengumuman', content: 'Selamat datang di Tutorial PAI semester genap! Program ini akan dimulai pada tanggal 17 Februari 2025.' },
    { title: 'Jadwal Kuliah Dhuha Februari 2025', category: 'Jadwal', content: 'Kuliah Dhuha akan dilaksanakan setiap Sabtu pukul 07:30 WIB di Auditorium FPIPS UPI.' },
    { title: 'Pendaftaran Mentoring Dibuka', category: 'Pendaftaran', content: 'Pendaftaran mentoring kelompok sudah dibuka! Segera daftarkan diri Anda melalui link yang tersedia.' },
];
newsItems.forEach(n => {
    db.prepare(`
        INSERT INTO news (id, title, content, category, author, published_date, is_published, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(genId('news'), n.title, n.content, n.category, 'Admin Tutorial', now.split('T')[0], 1, now, now);
});
console.log(`   ✓ ${newsItems.length} news created`);

// 4. Seed Kuliah Dhuha Schedule
console.log('\n🕌 Creating Kuliah Dhuha schedule...');
const kuliahDhuha = [
    { week: 1, date: '2025-02-22', topic: 'Adab Menuntut Ilmu', speaker: 'Ust. Ahmad Fauzi, M.Pd.I' },
    { week: 2, date: '2025-03-01', topic: 'Tazkiyatun Nafs', speaker: 'Ust. Muhammad Rizki, Lc.' },
    { week: 3, date: '2025-03-08', topic: 'Fiqih Ibadah Praktis', speaker: 'Ust. Hasan Abdullah, S.Ag.' },
    { week: 4, date: '2025-03-15', topic: 'Sirah Nabawiyah', speaker: 'Ust. Ibrahim Malik, M.A.' },
];
kuliahDhuha.forEach(k => {
    db.prepare(`
        INSERT INTO kuliah_dhuha_schedule (id, week_number, date, topic, speaker, location, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(genId('kd'), k.week, k.date, k.topic, k.speaker, 'Masjid Kampus UPI', now, now);
});
console.log(`   ✓ ${kuliahDhuha.length} schedules created`);

// 5. Seed Cabinet Members
console.log('\n👥 Creating cabinet members...');
const cabinet = [
    { name: 'Ahmad Fauzan', position: 'Ketua Umum', division: 'Pimpinan', order: 1 },
    { name: 'Siti Aisyah', position: 'Sekretaris Umum', division: 'Pimpinan', order: 2 },
    { name: 'Muhammad Rizki', position: 'Bendahara Umum', division: 'Pimpinan', order: 3 },
    { name: 'Fatimah Azzahra', position: 'Koordinator Akademik', division: 'Akademik', order: 4 },
    { name: 'Umar Abdullah', position: 'Koordinator Dakwah', division: 'Dakwah', order: 5 },
    { name: 'Khadijah Nur', position: 'Koordinator Sosial', division: 'Sosial', order: 6 },
];
cabinet.forEach(c => {
    db.prepare(`
        INSERT INTO cabinet_members (id, name, position, division, order_index, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(genId('cab'), c.name, c.position, c.division, c.order, now, now);
});
console.log(`   ✓ ${cabinet.length} members created`);

// 6. Seed Seminar Schedule
console.log('\n🎓 Creating seminar schedule...');
const seminars = [
    { week: 1, date: '2025-03-01', topic: 'Pendidikan Karakter dalam Islam', speaker: 'Prof. Dr. H. Ahmad Tafsir' },
    { week: 2, date: '2025-03-08', topic: 'Metodologi Pembelajaran PAI', speaker: 'Dr. Hj. Siti Fatimah, M.Pd.' },
];
seminars.forEach(s => {
    db.prepare(`
        INSERT INTO seminar_schedule (id, week_number, date, topic, speaker, location, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(genId('sem'), s.week, s.date, s.topic, s.speaker, 'Gedung FIP UPI', now, now);
});
console.log(`   ✓ ${seminars.length} seminars created`);

// Summary
console.log('\n' + '='.repeat(50));
console.log('✅ Database seeding completed!');
console.log('='.repeat(50));

// Show counts
const tables = ['users', 'calendar_events', 'news', 'kuliah_dhuha_schedule', 'cabinet_members', 'seminar_schedule'];
console.log('\n📊 Data Summary:');
tables.forEach(t => {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${t}`).get();
    console.log(`   - ${t}: ${count.count} rows`);
});

console.log('\n🔐 Login Credentials:');
console.log('   Email: admin@tutorial-pai.upi.edu');
console.log('   Password: admin123');

db.close();
