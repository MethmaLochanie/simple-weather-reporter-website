import express from 'express';
import { getProfile, updateLocation } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import { locationRateLimiter } from '../middleware/rateLimit';

const router = express.Router();
// Get user profile (protected route)
router.get('/profile', authMiddleware, getProfile);
// Update user location (protected route, rate limited)
router.post('/location', authMiddleware, locationRateLimiter, updateLocation);

export default router; 