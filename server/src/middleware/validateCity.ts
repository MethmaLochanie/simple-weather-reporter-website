import { RequestHandler } from 'express';

export const validateCity: RequestHandler = (req, res, next) => {
  const city = (req.query.city as string | undefined)?.trim();

  if (!city) {
    res.status(400).json({ error: 'Query parameter "city" is required' });
    return;            
  }

  next();
};
