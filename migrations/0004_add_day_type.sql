-- Migration: Add day_type column to kuliah_dhuha_schedule
-- This allows different speakers for Sabtu (FPIPS & FPSD) and Minggu (FIP, FK & FPEB)
-- while keeping the same topic/materials for the same week

ALTER TABLE kuliah_dhuha_schedule ADD COLUMN day_type TEXT DEFAULT 'Sabtu';

-- Update existing records to have proper day_type based on date if needed
-- Note: Run this in Cloudflare D1 dashboard or via wrangler
