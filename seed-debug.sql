-- Seed Cabinet Members
INSERT INTO cabinet_members (id, name, position, division, photo_url, created_at) VALUES 
('seed-01', 'Muhtarom Nur Rasyid', 'Ketua Umum', 'BPH', '/assets/pengurus/ketum.jpg', CURRENT_TIMESTAMP),
('seed-02', 'Dika Rahman Firmansah', 'Wakil Ketua Umum I', 'BPH', '/assets/pengurus/waketum1.jpg', CURRENT_TIMESTAMP),
('seed-03', 'Adinda Zakiyah Ramadhanti', 'Wakil Ketua Umum II', 'BPH', '/assets/pengurus/waketum2.jpg', CURRENT_TIMESTAMP),
('seed-04', 'Nina Wulandari', 'Sekretaris Umum', 'Sekretaris Umum', NULL, CURRENT_TIMESTAMP),
('seed-05', 'Rachma Cantika D.', 'Bendahara Umum', 'Bendahara Umum', NULL, CURRENT_TIMESTAMP),
('seed-06', 'Adnan Azizi', 'Ketua Bidang', 'Kepesertaan', NULL, CURRENT_TIMESTAMP),
('seed-07', 'Muhammad Fathan Mubina', 'Ketua Bidang', 'Penjaminan dan Peningkatan Mutu Tutorial', NULL, CURRENT_TIMESTAMP);

-- Seed Calendar Events
INSERT INTO calendar_events (id, title, description, date, time, location, category, created_at) VALUES 
('ev-01', 'Kuliah Dhuha Perdana', 'Pembukaan kegiatan tutorial semester genap.', '2025-02-14', '07:00', 'Masjid Al-Furqan', 'Kuliah Dhuha', CURRENT_TIMESTAMP),
('ev-02', 'Technical Meeting Mentor', 'Persiapan materi tutorial pekan pertama.', '2025-02-15', '16:00', 'Gedung Mata Kuliah Umum (MKU)', 'Mentoring', CURRENT_TIMESTAMP);
