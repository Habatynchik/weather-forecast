const axios = require('axios');
const conlsole = require("debug");
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;

async function getWeatherByCity(city) {
    if (!city) {
        throw new Error('City is required');
    }
    console.log(city);

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;
    console.log(weatherUrl);

    try {
        const response = await axios.get(weatherUrl);
        const data = response.data;
        console.log(data);

        return {
            city: city,
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            windSpeed: data.wind.speed,
            img: data.weather[0].icon
        };
    } catch (error) {
        throw Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
}

module.exports = { getWeatherByCity };
