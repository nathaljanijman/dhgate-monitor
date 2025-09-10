-- Maak de users tabel
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Maak de subscriptions tabel voor widget signups
CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  stores TEXT,
  tags TEXT,
  lang TEXT DEFAULT 'nl',
  unsubscribe_token TEXT,
  dashboard_token TEXT,
  dashboard_access BOOLEAN DEFAULT 1,
  subscribed BOOLEAN DEFAULT 1,
  email_marketing_consent BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Voeg een paar testgebruikers toe
INSERT INTO users (email) VALUES ('alice@example.com');
INSERT INTO users (email) VALUES ('bob@example.com');
INSERT INTO users (email) VALUES ('charlie@example.com');
