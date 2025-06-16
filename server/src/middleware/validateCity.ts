import { RequestHandler } from 'express';

export const validateCity: RequestHandler = (req, res, next) => {
  let city = (req.query.city as string | undefined)?.trim();

  if (!city) {
    res.status(400).json({ error: 'Query parameter "city" is required' });
    return;
  }

  // Sanitize input: remove digits and special characters except space, dash, comma
  city = city.replace(/[^a-zA-Z\s,-]/g, '');

  req.query.city = city;
  next();
};
