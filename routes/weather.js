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
});
router.get("/current/:city", async (req, res) => {
    try {
        let city = req.params.city;
        const data = await weatherService.getWeather(city);
        let user = req.session.user;

        if (!data || !data.main || !data.wind) {
            throw new Error("Неправильні або неповні дані погоди з API");
        }

        if(!user) {
            res.json(data);
        } else{
            let userid = user.id;
            let temp = data.main.temp;
            let humidity = data.main.humidity;
            let wind = data.wind.speed;
            const today = new Date();
            const day = today.getDate().toString().padStart(2, '0');
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const year = today.getFullYear();

            const date = `${year}-${month}-${day}`;
            const query = await weatherService.saveQuery(userid,city, temp,humidity, wind, date)
            res.json(data);
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

module.exports = router;