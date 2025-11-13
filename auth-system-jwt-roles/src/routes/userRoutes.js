import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { db } from '../lib/db.js';

const router = Router();

// Example protected route for any authenticated user
router.get('/profile', authenticate, (req, res) => {
  const row = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.sub);
  if (!row) return res.status(404).json({ error: 'User not found' });
  res.json({ profile: row });
});

export default router;
