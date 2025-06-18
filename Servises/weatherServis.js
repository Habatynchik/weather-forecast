import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const WEATHER_API_KEY = process.env.FORECAST_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function normalizeCity(city) {
    return city === 'Kiev' ? 'Kyiv' : city;
}

export const weatherService = {
    async getWeather(city) {
        const normalizedCity = normalizeCity(city);
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: normalizedCity,
                appid: WEATHER_API_KEY,
                units: 'metric',
                lang: 'ua',
            },
        });
        return response.data;
    },

    async getForecast(city) {
        const normalizedCity = normalizeCity(city);
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: normalizedCity,
                appid: WEATHER_API_KEY,
                units: 'metric',
                lang: 'ua',
            },
        });
        return response.data;
    },
};
