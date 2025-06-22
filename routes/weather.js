let express = require('express');
let router = express.Router();
let weatherService = require('../services/weatherService');

// GET /weather/:city – поточна погода
router.get("/:city", async (req, res) => {
    try {
        let city = req.params.city;
        let data = await weatherService.getWeather(city);
        res.json(data);            // «як є», без обробки
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
});

module.exports = router;