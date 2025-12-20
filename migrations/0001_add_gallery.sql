-- Migration: Add gallery table for photo management with placeholder system
-- Run with: npx wrangler d1 execute tutorial-pai-db --file=migrations/0001_add_gallery.sql

-- First, check if table exists and drop it (for fresh install)
-- If upgrading, run ALTER instead

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'Kegiatan',
    placeholder TEXT,
    order_index INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_published ON gallery(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_placeholder ON gallery(placeholder);

-- If upgrading from existing table (without placeholder), run this instead:
-- ALTER TABLE gallery ADD COLUMN placeholder TEXT;
-- CREATE INDEX IF NOT EXISTS idx_gallery_placeholder ON gallery(placeholder);
