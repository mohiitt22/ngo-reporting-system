const Database = require("better-sqlite3");

const db = new Database("ngo_reports.db");

// Create reports table
db.prepare(`
  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ngo_id TEXT,
    month TEXT,
    people_helped INTEGER,
    events_conducted INTEGER,
    funds_utilized REAL,
    UNIQUE(ngo_id, month)
  )
`).run();

// Job tracking table
db.prepare(`
  CREATE TABLE IF NOT EXISTS jobs (
    job_id TEXT PRIMARY KEY,
    total INTEGER,
    processed INTEGER,
    failed INTEGER,
    status TEXT
  )
`).run();

module.exports = db;
