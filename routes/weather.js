let express = require('express');
let router = express.Router();
let weatherService = require('../services/weatherService');
const userRepository = require('../model/userRepository');

// GET /weather/:city – поточна погода
router.get("/:city", async (req, res) => {
    try {
        let city = req.params.city;
        let data = await weatherService.getWeather(city);
        console.log(data)
        res.json(data);// «як є», без обробки
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

// GET /weather/forecast/:city/ – 5‑денний прогноз
router.get("/forecast/:city", async (req, res) => {
    try {
        let city = req.params.city;
        const data = await weatherService.getForecast(city);
        res.json(data);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
    await saveForecastQuery({
        city: data.city.name,
        timestamp: new Date(),
        forecast: data.list.map(item => ({
            time: item.dt_txt,
            temp: item.main.temp,
            condition: item.weather[0].description
        }))
    });
});
router.get("/current/:city", async (req, res) => {
    try {
        let city = req.params.city;
        const data = await weatherService.getWeather(city);
        res.json(data);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
    await saveWeatherQuery({
        city: data.name,
        temp: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        timestamp: new Date(),
    });

});


module.exports = router;