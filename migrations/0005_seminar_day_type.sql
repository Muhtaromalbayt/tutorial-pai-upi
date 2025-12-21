-- Migration: Add day_type column to seminar_schedule
-- This allows different speakers for Rabu (FPIPS & FPSD) and Jumat (FIP, FK & FPEB)
-- while keeping the same topic/materials for the same week

ALTER TABLE seminar_schedule ADD COLUMN day_type TEXT DEFAULT 'Rabu';
