-- Maak de users tabel
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Voeg een paar testgebruikers toe
INSERT INTO users (email) VALUES ('alice@example.com');
INSERT INTO users (email) VALUES ('bob@example.com');
INSERT INTO users (email) VALUES ('charlie@example.com');
