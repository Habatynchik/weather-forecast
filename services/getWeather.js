const axios = require('axios');
require('dotenv').config({ path: '../.env' });

async function getWeatherByCity(city) {
    if (!city) {
        throw new Error('City is required');
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(weatherUrl);
        const data = response.data;

        return {
            name: city,
            temp: data.main.temp,
            icon: data.weather.icon,
        };
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
}

module.exports = { getWeatherByCity };
