import rateLimit from 'express-rate-limit';
import { Request } from 'express';
import { AuthRequest } from './auth';

export const locationRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each user to 10 requests per windowMs
  message: { error: 'Too many location update requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request): string => {
    // Use user ID if authenticated, otherwise fallback to IP
    const user = (req as AuthRequest).user;
    if (user && user.userId) return String(user.userId);
    return req.ip || '';
  }
}); 