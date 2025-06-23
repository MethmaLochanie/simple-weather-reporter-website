import express from 'express';
import { getProfile, updateLocation } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
// Get user profile (protected route)
router.get('/profile', authMiddleware, getProfile);
// Update user location (protected route)
router.post('/location', authMiddleware, updateLocation);

export default router; 