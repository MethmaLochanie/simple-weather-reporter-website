import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email, password } = req.body;
  
  // Validate required fields
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Username, email, and password are required' });
    return;
  }

  // Validate username length
  if (username.length < 3) {
    res.status(400).json({ error: 'Username must be at least 3 characters long' });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  // Validate password length
  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters long' });
    return;
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ error: 'Email/Username and password are required' });
    return;
  }

  next();
};

export const validateVerificationToken = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.query;
  
  if (!token || typeof token !== 'string') {
    res.status(400).json({ error: 'Invalid verification token' });
    return;
  }

  next();
}; 