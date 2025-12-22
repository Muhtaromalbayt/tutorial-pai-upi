-- Migration: Add program_studi column to cabinet_members table
-- Run with: npx wrangler d1 execute tutorial-pai-db --file=migrations/0004_add_program_studi.sql

ALTER TABLE cabinet_members ADD COLUMN program_studi TEXT;

-- Create index for faster queries by division
CREATE INDEX IF NOT EXISTS idx_cabinet_members_division ON cabinet_members(division);
