-- WikiWander Daily Wanders Schema
-- Run this against your Neon database to create the required tables

CREATE TABLE IF NOT EXISTS daily_wanders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for efficient date lookups
CREATE INDEX IF NOT EXISTS idx_daily_wanders_date ON daily_wanders (date DESC);
