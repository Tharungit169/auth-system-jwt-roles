import dotenv from 'dotenv';
dotenv.config();
import { db } from './lib/db.js';
import bcrypt from 'bcryptjs';

// wipe and recreate users
db.exec('DROP TABLE IF EXISTS users;');
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user','admin')) DEFAULT 'user',
  created_at TEXT DEFAULT (datetime('now'))
);
`);

const hash = bcrypt.hashSync('admin123', 10);
db.prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)')
  .run('Admin', 'admin@example.com', hash, 'admin');

console.log('Database reset. Admin user: admin@example.com / admin123');
