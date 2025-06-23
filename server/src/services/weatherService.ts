import axios from 'axios';
import { WeatherData } from '../types/types';

const cache = new Map<string, { data: WeatherData; expires: number; }>();
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes


export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
    const API_KEY = process.env.WEATHER_API_KEY;

    const now = Date.now();

    // Serve from cache if not expired
    const cached = cache.get(city.toLowerCase());
    if (cached && cached.expires > now) {
        return cached.data;
    }


    const WEATHER_API_URL = process.env.WEATHER_API_URL;
    const url = `${WEATHER_API_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
        city
    )}&aqi=yes`;

    try {
        const { data } = await axios.get(url);

        const result: WeatherData = {
            temperature: data.current.temp_c,
            humidity: data.current.humidity,
            wind_speed: data.current.wind_kph,
            uv_index: data.current.uv,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            location: data.location.name
        };

        // Cache result
        cache.set(city.toLowerCase(), {
            data: result,
            expires: now + CACHE_TTL_MS
        });

        return result;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            throw new Error(`Invalid city name: "${city}"`);
        }
        throw new Error('Failed to fetch weather data from API');
    }
};
