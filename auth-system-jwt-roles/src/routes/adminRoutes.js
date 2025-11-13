import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { db } from '../lib/db.js';

const router = Router();

// Admin-only: list all users (minimal example)
router.get('/users', authenticate, requireRole('admin'), (req, res) => {
  const rows = db.prepare('SELECT id, name, email, role, created_at FROM users ORDER BY id DESC').all();
  res.json({ users: rows });
});

export default router;
