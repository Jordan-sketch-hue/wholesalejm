import express from 'express';
import { auth } from '../../middleware/index.js';

const router = express.Router();

// Get user profile
router.get('/me', auth, async (req, res) => {
  try {
    // TODO: Get user from database
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
  try {
    // TODO: Update user in database
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
