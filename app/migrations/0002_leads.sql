CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
