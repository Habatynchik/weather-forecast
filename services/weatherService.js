const axios = require('axios');
require('dotenv').config('../.env');

const WEATHER_API_KEY = process.env.FORECAST_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherService = {
    async getWeather(city) {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: WEATHER_API_KEY,
                units: 'metric',
                lang: 'ua',
            },
        });
        return response.data;
    },

    async getForecast(city) {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: WEATHER_API_KEY,
                units: 'metric',
                lang: 'ua',
            },
        });
        return response.data;
    },
};

module.exports = weatherService;
