var express = require('express');
var router = express.Router();
const { getWeatherByCity } = require("../services/getWeather");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get("/get/recommended", async function (req, res, next) {
  const cities = ["Лондон", "Київ", "Харків"];
  // потім треба додати логіку, якщо авторизований то брати улюблене місто

  try {
    const weatherDataArray = await Promise.all(
        cities.map(city => getWeatherByCity(city))
    );
    res.json(weatherDataArray);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data", details: err.message });
  }
});

router.get('/get/:city', function(req, res, next) {
  res.json(getWeatherByCity(req.params.city));
})

module.exports = router;
