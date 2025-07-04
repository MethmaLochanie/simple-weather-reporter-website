import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email, password } = req.body;
  
  // Validate required fields
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Username, email, and password are required' });
    return;
  }

  // Validate username length
  if (username.length < 3 || username.length > 20) {
    res.status(400).json({ error: 'Username must be between 3 and 20 characters long' });
    return;
  }

  // Validate username format (letters, numbers, underscores only)
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    res.status(400).json({ error: 'Username can only contain letters, numbers, and underscores' });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  // Validate password length
  if (password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters long' });
    return;
  }

  // Validate password complexity
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) {
    res.status(400).json({ error: 'Password must contain at least one uppercase letter' });
    return;
  }

  if (!hasLowerCase) {
    res.status(400).json({ error: 'Password must contain at least one lowercase letter' });
    return;
  }

  if (!hasNumbers) {
    res.status(400).json({ error: 'Password must contain at least one number' });
    return;
  }

  if (!hasSpecialChar) {
    res.status(400).json({ error: 'Password must contain at least one special character' });
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

export const validateEmail = (req: Request, res: Response, next: NextFunction): void => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  next();
}; 