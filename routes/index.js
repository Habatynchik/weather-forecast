const express = require('express');
const router = express.Router();

const userRepository =  require('../model/userRepository');
const weatherService = require('../services/weatherService');

router.get('/', async function(req, res, next) {
    try {
        const sessionUser = req.session.user;

        // Якщо немає користувача або його ID
        if (!sessionUser || !sessionUser.id) {
            return res.render('index');
        }

        // Отримуємо список улюблених міст користувача
        const favoriteCities = await userRepository.getAllFavoritesCities(sessionUser.id);

        // Якщо немає жодного міста — просто рендеримо сторінку
        if (!favoriteCities || favoriteCities.length === 0) {
            return res.render('index');
        }

        // Запити погоди для кожного міста
        const weatherDataPromises = favoriteCities.map(entry =>
            weatherService.getWeather(entry.city)
        );

        const weatherResults = await Promise.all(weatherDataPromises);

        // Виводимо погоду в консоль
        weatherResults.forEach((weather, i) => {
            console.log(`🌦️ Погода в ${favoriteCities[i].city}:`, weather);
        });

        // Якщо хочеш передати ці дані на сторінку:
        res.render('index', { weatherResults });

    } catch (error) {
        console.error('❌ Помилка при обробці запиту /:', error);
        res.render('index'); // fallback
    }
});

module.exports = router;
