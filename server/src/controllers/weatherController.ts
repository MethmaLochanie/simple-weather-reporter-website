import { Request, Response, NextFunction } from 'express';
import { fetchCurrentWeather } from '../services/weatherService';

export const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const city = req.query.city as string;
    const weather = await fetchCurrentWeather(city);
    res.json(weather);
  } catch (err: any) {
    if (err.message.startsWith('Invalid city name')) {
      res.status(404).json({ error: err.message });
    } else {
      next(err);
    }
  }
};

