let express = require('express');
let router = express.Router();
let weatherService = require('../services/weatherService');
const userRepository = require('../model/userRepository');
const { saveWeatherQuery } = require('../configurations/db');

// GET /weather/:city – поточна погода
router.get("/:city", async (req, res) => {
    try {
        let city = req.params.city;
        let data = await weatherService.getWeather(city);
        console.log(data)
        res.json(data);// «як є», без обробки
    } catch (err) {
        res.status(err.status || 500).json({error: err.message});
    }
});

// GET /weather/forecast/:city/ – 5‑денний прогноз
router.get("/forecast/:city", async (req, res) => {
    try {
        let city = req.params.city;
        const data = await weatherService.getForecast(city);
    } catch (err) {
        res.status(err.status || 500).json({error: err.message});
    }
    res.json(data);
});
router.get("/current/:city", async (req, res) => {
    const user = req.session.user;
    const isAuthenticated = !!user;

    try {
        const city = req.params.city;
        const data = await weatherService.getWeather(city);

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const wind_speed = data.wind.speed;

        if (isAuthenticated) {
            await userRepository.saveWeatherQuery({
                userid: user.id,
                city: data.name,
                temp: temp,
                humidity: humidity,
                wind_speed:wind_speed,
                date: new Date()
            });
        }

        res.json(data);
    } catch (err) {
        res.status(err.status || 500).json({error: err.message});
    }
});

module.exports = router;