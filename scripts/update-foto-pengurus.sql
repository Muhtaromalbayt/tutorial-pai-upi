-- Update foto pengurus dengan link Google Drive HD
-- FIXED: Matching exact position names from seed data
-- Run with: npx wrangler d1 execute tutorial-pai-db --remote --file=scripts/update-foto-pengurus.sql

-- TriCore
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1jWRT5pfO9yOhKdU1xz2lsf6BOsEYUA5R' WHERE position = 'Ketua Umum';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/15-Jh6_w_OtGqrQUfI5-HIPvZTfyp2EaU' WHERE position = 'Wakil Ketua Umum I';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1YACs6CLZLGcPbKhNHuVfX-hYQelaqwBi' WHERE position = 'Wakil Ketua Umum II';

-- Sekretaris Umum
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/120w77s9qXhQu7YBcGWRKH4hMUCOgbr7M' WHERE position = 'Ketua Bidang Sekretaris Umum';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1ebggcSb4VDRI9JRsQfGwHFZduGtiWU1L' WHERE position = 'Wakil Ketua Bidang Sekretaris Umum';

-- Bendahara Umum
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1wKZE77eEScHN9a5bPy6Ly1lIBMgMwjWD' WHERE position = 'Ketua Bidang Bendahara Umum';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1lEid3iG_mRlwzEOOuP-G1CR-tKXpARgd' WHERE position = 'Wakil Ketua Bidang Bendahara Umum';

-- Pelaksana PAI
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1rx4bsbtoLb_5tQmTlRp9CcM_qMk3XK-c' WHERE position = 'Ketua Bidang Pelaksana PAI';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1ld6W2hbUQHtH0QQ9g93M5uWu7DjJOziG' WHERE position = 'Wakil Ketua Bidang Pelaksana PAI';

-- Pelaksana SPAI
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1upRVoV_j8BY0hfbZAECewb7lAcztlxB_' WHERE position = 'Ketua Bidang Pelaksana SPAI';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1OtD4FiuAOhHGEK-bSnJ2kHAQ0B9CF0e_' WHERE position = 'Wakil Ketua Bidang Pelaksana SPAI';

-- PSDI (Pengembangan Sumber Daya Insani) - FIXED: use exact name "PSDI" not full name
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1VYgUNJHHdef37cbCeri-_wLQeEXA4QNA' WHERE position = 'Ketua Bidang PSDI';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1OCLDjcS7Jm7WCznaXTSvw3WEZDTDZ7_K' WHERE position = 'Wakil Ketua Bidang PSDI';

-- Kepesertaan
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1EHfwzAK07QKDArp9nrJK3xTDG5nii_Mo' WHERE position = 'Ketua Bidang Kepesertaan';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1p-EhJukmVv16-FWdYNiYcJm0vwFZZ9WU' WHERE position = 'Wakil Ketua Bidang Kepesertaan';

-- Ketutoran
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1OcIPLY7eymwn4q_R0iIFAVDs3-TW4Qfn' WHERE position = 'Ketua Bidang Ketutoran';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1nuDymslsPSJjZcprbPHTLNhR_KXEwrhR' WHERE position = 'Wakil Ketua Bidang Ketutoran';

-- Media Kreatif Informasi
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1H1fSHg-uu74B1t6evCpaa4RQJwhQ0MZg' WHERE position = 'Ketua Bidang Media Kreatif Informasi';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1QRcfUyX0-wzVLcC_gkr-ahvbtrW4jyl6' WHERE position = 'Wakil Ketua Bidang Media Kreatif Informasi';

-- Penjaminan Mutu - FIXED: use exact name "Penjaminan Mutu" 
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1F3ahm3iAR5opsI2aWLphcpsBRv2-JeHE' WHERE position = 'Ketua Bidang Penjaminan Mutu';
UPDATE cabinet_members SET photo_url = 'https://lh3.googleusercontent.com/d/1FMsJXU9U9uj-yy0hJdWwuo2QQGKX3LK3' WHERE position = 'Wakil Ketua Bidang Penjaminan Mutu';
