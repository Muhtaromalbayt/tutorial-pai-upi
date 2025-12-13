-- Create site_settings table to store key-value pairs
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default values
INSERT OR IGNORE INTO site_settings (key, value) VALUES 
('site_title', 'Tutorial PAI-SPAI UPI'),
('site_description', 'Unit Kegiatan Mahasiswa Tutorial PAI-SPAI Universitas Pendidikan Indonesia'),
('hero_title', 'Tutorial PAI-SPAI UPI'),
('hero_subtitle', 'Membentuk Karakter Insan Rabbani Berlandaskan Al-Quran dan As-Sunnah'),
('hero_image_url', '/assets/hero/hero-bg.jpg'),
('contact_email', 'tutorialpaispai@upi.edu'),
('contact_phone', ''),
('instagram_url', 'https://instagram.com/tutorialpaispaiupi');
