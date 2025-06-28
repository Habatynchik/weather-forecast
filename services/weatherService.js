const axios = require('axios');
require('dotenv').config('../.env');
const userRepository = require('../model/userRepository');

const WEATHER_API_KEY = process.env.FORECAST_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherService = {
    async getWeather(city) {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: WEATHER_API_KEY,
                units: 'metric',
            },
        });
        console.log(response.data);
        return response.data;
    },

    async getForecast(city) {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: WEATHER_API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    },
    async saveQuery(userid, city, temp, humidity, wind, date) {
        try{
            let data = await userRepository.saveWeatherQuery(userid,city, temp, humidity, wind, date);
            return data;
        } catch(err) {
            throw new  Error('Error while trying to save weather query');
        }
    }
};

module.exports = weatherService;
