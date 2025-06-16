import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateCity } from '../src/middlewares/validateCity';
import { fetchWeather } from '../src/services/weatherService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cityValidation = validateCity(req.query.city as string | undefined);
  if (cityValidation.error) {
    return res.status(400).json({ error: cityValidation.error });
  }



  try {
    if (cityValidation.cleaned) {
      const city = cityValidation.cleaned;
      const weather = await fetchWeather(city);
      return res.status(200).json(weather);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message.startsWith('Invalid city')) {
      return res.status(404).json({ error: error.message });
    }
    console.error('[Weather API Error]', error.message || error);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
