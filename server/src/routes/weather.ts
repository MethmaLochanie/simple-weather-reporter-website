import { Router } from 'express';
import { getWeather } from '../controllers/weatherController';
import { validateCity } from '../middleware/validateCity';


const router = Router();

router.get('/weather', validateCity, getWeather);


export default router;
