var express = require('express');
var router = express.Router();
const { getWeatherByCity } = require("../services/getWeather");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get/:city', function(req, res, next) {
  res.json(getWeatherByCity(req.params.city));
})

router.get("/get/recommended", async function (req, res, next) {
  const city = "Kyiv";
  // потім треба додати логіку, якщо авторизований то брати список улюблених міст

  try {
    const weatherData = await getWeatherByCity(city)
  console.log(weatherData);
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data", details: err.message });
  }
});

module.exports = router;
