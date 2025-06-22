import express from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { validateRegistration, validateLogin, validateVerificationToken } from '../middleware/validation';

const router = express.Router();
const authController = new AuthController();

// Register user
router.post('/register', validateRegistration, (req, res) => authController.register(req, res));

// Verify email
router.get('/verify', validateVerificationToken, (req, res) => authController.verifyEmail(req, res));

// Login user
router.post('/login', validateLogin, (req, res) => authController.login(req, res));

// Get user profile (protected route)
router.get('/profile', authMiddleware, (req, res) => authController.getProfile(req, res));

export default router; 