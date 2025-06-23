import { Request, Response } from 'express';
import { registerUser, verifyEmail as verifyEmailService, loginUser } from '../services/authService';

// Register user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const result = await registerUser(username, email, password);
    
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error: any) {
    console.error('Register controller error:', error);
    
    if (error.message === 'Failed to send verification email') {
      res.status(500).json({ 
        error: 'Registration successful but failed to send verification email. Please contact support.' 
      });
      return;
    }
    
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

// Verify email
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query as { token: string };
    const result = await verifyEmailService(token);
    
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Verification controller error:', error);
    res.status(500).json({ error: 'Verification failed. Please try again.' });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    
    if (result.success) {
      res.json({
        message: result.message,
        token: result.token,
        user: result.user
      });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Login controller error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};