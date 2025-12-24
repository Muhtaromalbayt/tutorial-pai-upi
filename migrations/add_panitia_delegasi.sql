-- Add Panitia Delegasi table for managing committee members
-- Run this migration on your D1 database

CREATE TABLE IF NOT EXISTS panitia_delegasi (
    id TEXT PRIMARY KEY,
    day_type TEXT NOT NULL,  -- 'rabu' or 'jumat'
    role TEXT NOT NULL,       -- 'Penyaji', 'MC', 'Operator', 'Notulensi', 'Time Keeper', 'Logistik', 'Keamanan', 'Dokumentasi'
    week_number INTEGER,      -- NULL for permanent roles, 1-8 for rotating roles (MC/Penyaji)
    name TEXT NOT NULL,
    gender TEXT DEFAULT 'ikhwan',  -- 'ikhwan' or 'akhwat'
    phone TEXT,               -- WhatsApp number (optional)
    order_index INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_panitia_delegasi_day ON panitia_delegasi(day_type);
CREATE INDEX IF NOT EXISTS idx_panitia_delegasi_role ON panitia_delegasi(role);
CREATE INDEX IF NOT EXISTS idx_panitia_delegasi_week ON panitia_delegasi(week_number);
