-- Tutorial PAI Database Schema for Cloudflare D1

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Calendar events
CREATE TABLE IF NOT EXISTS calendar_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'kuliah_dhuha', 'seminar', 'mentoring', 'bina_kader', 'bina_mentor', 'other'
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Kuliah Dhuha schedules
CREATE TABLE IF NOT EXISTS kuliah_dhuha_schedule (
  id TEXT PRIMARY KEY,
  week_number INTEGER NOT NULL,
  date DATE NOT NULL,
  topic TEXT NOT NULL,
  speaker TEXT,
  materials TEXT, -- JSON array of material links
  location TEXT DEFAULT 'Masjid Kampus UPI',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seminar PAI schedules
CREATE TABLE IF NOT EXISTS seminar_schedule (
  id TEXT PRIMARY KEY,
  week_number INTEGER NOT NULL,
  date DATE NOT NULL,
  topic TEXT NOT NULL,
  speaker TEXT,
  materials TEXT, -- JSON array
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mentoring schedules
CREATE TABLE IF NOT EXISTS mentoring_schedule (
  id TEXT PRIMARY KEY,
  week_number INTEGER NOT NULL,
  date DATE NOT NULL,
  topic TEXT NOT NULL,
  mentor TEXT,
  group_number INTEGER,
  materials TEXT, -- JSON array
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bina Kader schedules
CREATE TABLE IF NOT EXISTS bina_kader_schedule (
  id TEXT PRIMARY KEY,
  week_number INTEGER NOT NULL,
  date DATE NOT NULL,
  topic TEXT NOT NULL,
  facilitator TEXT,
  materials TEXT, -- JSON array
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bina Mentor schedules
CREATE TABLE IF NOT EXISTS bina_mentor_schedule (
  id TEXT PRIMARY KEY,
  week_number INTEGER NOT NULL,
  date DATE NOT NULL,
  topic TEXT NOT NULL,
  facilitator TEXT,
  materials TEXT, -- JSON array
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Binder schedules
CREATE TABLE IF NOT EXISTS binder_schedule (
  id TEXT PRIMARY KEY,
  week_number INTEGER NOT NULL,
  date DATE NOT NULL,
  topic TEXT NOT NULL,
  facilitator TEXT,
  materials TEXT, -- JSON array
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- News/Announcements
CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'announcement',
  image_url TEXT,
  author TEXT,
  published_date DATE,
  is_published BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cabinet members (Pengurus)
CREATE TABLE IF NOT EXISTS cabinet_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  division TEXT,
  photo_url TEXT,
  email TEXT,
  phone TEXT,
  bio TEXT,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_calendar_date ON calendar_events(date);
CREATE INDEX IF NOT EXISTS idx_calendar_category ON calendar_events(category);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_date);
CREATE INDEX IF NOT EXISTS idx_kuliah_week ON kuliah_dhuha_schedule(week_number);
