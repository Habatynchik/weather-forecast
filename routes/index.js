const express = require('express');
const router = express.Router();

const userRepository =  require('../model/userRepository');
const weatherService = require('../services/weatherService');

router.get('/', async function(req, res, next) {
    try {
        const sessionUser = req.session.user;

        // Якщо немає користувача або його ID
        if (!sessionUser || !sessionUser.id) {
            return res.render('index', { weatherResults: [] });
        }

        // Отримуємо список улюблених міст користувача
        const favoriteCities = await userRepository.getAllFavoritesCities(sessionUser.id);

        // Якщо немає жодного міста — просто рендеримо сторінку
        if (!favoriteCities || favoriteCities.length === 0) {
            return res.render('index', { weatherResults: [] });
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

        res.render('index', { weatherResults });

    } catch (error) {
        console.error('Помилка при обробці запиту /:', error);
        return res.render('index', { weatherResults: [] });
    }
});

router.post('/delete', async function(req, res, next) {
    try {
        const user = req.session.user;
        const city = req.body.city;

        if (!user || !user.id || !city) {
            console.error("Помилка: user або city не вказані.");
            return res.redirect('/');
        }

        await userRepository.deleteCity(user.id, city);
        res.redirect('/');
    } catch (error) {
        console.error('Помилка при обробці запиту /delete:', error);
        res.status(500).render('index', { error: 'Не вдалося видалити місто.' });
    }
});

module.exports = router;
