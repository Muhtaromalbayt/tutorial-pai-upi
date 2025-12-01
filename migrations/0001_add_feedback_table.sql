-- Migration to add feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  is_anonymous BOOLEAN DEFAULT 0,
  category TEXT NOT NULL, -- 'suggestion', 'complaint', 'praise', 'question', 'other'
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  attachments TEXT, -- JSON array of {type, name, data (base64), mimeType, size}
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'resolved'
  admin_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status, created_at);
