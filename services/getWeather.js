const axios = require('axios');
require('dotenv').config();

async function getWeatherByCity(city) {
    if (!city) {
        throw new Error('City is required');
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(weatherUrl);
        const data = response.data;

        return {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            description: data.weather[0].description,
            windSpeed: data.wind.speed
        };
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
}

module.exports = { getWeatherByCity };
