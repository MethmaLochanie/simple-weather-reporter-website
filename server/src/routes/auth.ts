import express from 'express';
import { register, verifyEmail, login, resendVerification } from '../controllers/authController';
import { validateRegistration, validateLogin, validateVerificationToken, validateEmail } from '../middleware/validation';

const router = express.Router();

// Register user
router.post('/register', validateRegistration, register);

// Verify email
router.get('/verify', validateVerificationToken, verifyEmail);

// Resend verification email
router.post('/resend-verification', validateEmail, resendVerification);

// Login user
router.post('/login', validateLogin, login);

export default router; 