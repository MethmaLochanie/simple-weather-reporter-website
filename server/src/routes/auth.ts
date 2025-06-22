import express from 'express';
import { register, verifyEmail, login, getProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { validateRegistration, validateLogin, validateVerificationToken } from '../middleware/validation';

const router = express.Router();

// Register user
router.post('/register', validateRegistration, register);

// Verify email
router.get('/verify', validateVerificationToken, verifyEmail);

// Login user
router.post('/login', validateLogin, login);

// Get user profile (protected route)
router.get('/profile', authMiddleware, getProfile);

export default router; 