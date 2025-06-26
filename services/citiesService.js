require('dotenv').config('../.env');
const axios = require('axios');

const NINJAS_CITY_API_KEY = process.env.NINJAS_CITY_API_KEY;
const BASE_URL = 'https://api.api-ninjas.com/v1/city';

const citiesService = {
    async getCities(city) {
        if (!city) return [];

        try {
            const response = await axios.get(BASE_URL, {
                params: { name: city },
                headers: { 'X-Api-Key': NINJAS_CITY_API_KEY },
            });

            return response.data; // масив міст
        } catch (err) {
            console.error('City API error:', err.response?.data || err.message);
            return []; // повертаємо порожній масив, якщо помилка
        }
    }
};

module.exports = citiesService;
