-- Seed data untuk Cloudflare D1
-- Jalankan dengan: wrangler d1 execute tutorial-pai-db --remote --file=./seed-d1.sql

-- 1. Admin User (password: admin123)
INSERT OR REPLACE INTO users (id, email, name, password, role, created_at)
VALUES ('admin_1', 'admin@tutorial-pai.upi.edu', 'Admin Tutorial', '$2a$10$rQnM1r5Q.5Qj8Zq6q5W5.OzLqJwR5j5QZk7dKj5Qj8Zq6q5W5.Oz', 'admin', datetime('now'));

-- 2. Calendar Events
INSERT INTO calendar_events (id, title, description, category, date, time, location, created_at, updated_at) VALUES
('evt_001', 'Kuliah Dhuha: Adab Menuntut Ilmu', 'Kajian perdana semester genap', 'Kajian', '2025-02-22', '07:30 - 09:00 WIB', 'Auditorium FPIPS UPI', datetime('now'), datetime('now')),
('evt_002', 'Seminar PAI: Pendidikan Karakter', 'Seminar pendidikan karakter dalam Islam', 'Seminar', '2025-03-01', '09:00 - 12:00 WIB', 'Gedung FIP UPI', datetime('now'), datetime('now')),
('evt_003', 'Mentoring Kelompok Batch 1', 'Mentoring perdana untuk batch 1', 'Program', '2025-03-05', '15:30 - 17:00 WIB', 'Masjid Kampus UPI', datetime('now'), datetime('now')),
('evt_004', 'Bina Kader: Leadership Training', 'Pelatihan kepemimpinan untuk kader', 'BINDER', '2025-03-10', '08:00 - 16:00 WIB', 'Aula PKM UPI', datetime('now'), datetime('now')),
('evt_005', 'Rihlah Tarbawiyah', 'Perjalanan tarbiyah ke alam', 'Rihlah', '2025-03-15', 'Full Day', 'Kawah Putih, Ciwidey', datetime('now'), datetime('now'));

-- 3. News
INSERT INTO news (id, title, content, category, author, published_date, is_published, created_at, updated_at) VALUES
('news_001', 'Pembukaan Tutorial PAI Semester Genap 2025/2026', 'Selamat datang di Tutorial PAI semester genap! Program ini akan dimulai pada tanggal 17 Februari 2025.', 'Pengumuman', 'Admin Tutorial', '2025-02-01', 1, datetime('now'), datetime('now')),
('news_002', 'Jadwal Kuliah Dhuha Februari 2025', 'Kuliah Dhuha akan dilaksanakan setiap Sabtu pukul 07:30 WIB di Auditorium FPIPS UPI.', 'Jadwal', 'Admin Tutorial', '2025-02-01', 1, datetime('now'), datetime('now')),
('news_003', 'Pendaftaran Mentoring Dibuka', 'Pendaftaran mentoring kelompok sudah dibuka! Segera daftarkan diri Anda melalui link yang tersedia.', 'Pendaftaran', 'Admin Tutorial', '2025-02-01', 1, datetime('now'), datetime('now'));

-- 4. Kuliah Dhuha Schedule
INSERT INTO kuliah_dhuha_schedule (id, week_number, date, topic, speaker, location, created_at, updated_at) VALUES
('kd_001', 1, '2025-02-22', 'Adab Menuntut Ilmu', 'Ust. Ahmad Fauzi, M.Pd.I', 'Masjid Kampus UPI', datetime('now'), datetime('now')),
('kd_002', 2, '2025-03-01', 'Tazkiyatun Nafs', 'Ust. Muhammad Rizki, Lc.', 'Masjid Kampus UPI', datetime('now'), datetime('now')),
('kd_003', 3, '2025-03-08', 'Fiqih Ibadah Praktis', 'Ust. Hasan Abdullah, S.Ag.', 'Masjid Kampus UPI', datetime('now'), datetime('now')),
('kd_004', 4, '2025-03-15', 'Sirah Nabawiyah', 'Ust. Ibrahim Malik, M.A.', 'Masjid Kampus UPI', datetime('now'), datetime('now'));

-- 5. Cabinet Members
INSERT INTO cabinet_members (id, name, position, division, order_index, created_at, updated_at) VALUES
('cab_001', 'Ahmad Fauzan', 'Ketua Umum', 'Pimpinan', 1, datetime('now'), datetime('now')),
('cab_002', 'Siti Aisyah', 'Sekretaris Umum', 'Pimpinan', 2, datetime('now'), datetime('now')),
('cab_003', 'Muhammad Rizki', 'Bendahara Umum', 'Pimpinan', 3, datetime('now'), datetime('now')),
('cab_004', 'Fatimah Azzahra', 'Koordinator Akademik', 'Akademik', 4, datetime('now'), datetime('now')),
('cab_005', 'Umar Abdullah', 'Koordinator Dakwah', 'Dakwah', 5, datetime('now'), datetime('now')),
('cab_006', 'Khadijah Nur', 'Koordinator Sosial', 'Sosial', 6, datetime('now'), datetime('now'));

-- 6. Seminar Schedule
INSERT INTO seminar_schedule (id, week_number, date, topic, speaker, location, created_at, updated_at) VALUES
('sem_001', 1, '2025-03-01', 'Pendidikan Karakter dalam Islam', 'Prof. Dr. H. Ahmad Tafsir', 'Gedung FIP UPI', datetime('now'), datetime('now')),
('sem_002', 2, '2025-03-08', 'Metodologi Pembelajaran PAI', 'Dr. Hj. Siti Fatimah, M.Pd.', 'Gedung FIP UPI', datetime('now'), datetime('now'));
