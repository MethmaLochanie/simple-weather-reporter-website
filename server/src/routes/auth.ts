import express from 'express';
import { register, verifyEmail, login } from '../controllers/authController';
import { validateRegistration, validateLogin, validateVerificationToken } from '../middleware/validation';

const router = express.Router();

// Register user
router.post('/register', validateRegistration, register);

// Verify email
router.get('/verify', validateVerificationToken, verifyEmail);

// Login user
router.post('/login', validateLogin, login);

export default router; 