const express = require('express');
const router = express.Router();

const userRepository =  require('../model/userRepository');
const weatherService = require('../services/weatherService');
const favoritService = require('../services/favoritService');

router.get('/', async function(req, res, next) {
    try {
        const sessionUser = req.session.user;

        if (!sessionUser || !sessionUser.id) {
            console.log('!!!')
            return res.render('index', { weatherResults: [] ,username: 'username', firstLetter: 'U'  });
        }

        const favoriteCities = await userRepository.getAllFavoritesCities(sessionUser.id);

        const firstLetter = req.session.user.username[0];
        if (!favoriteCities || favoriteCities.length === 0) {
            return res.render('index', { weatherResults: [] ,  username: req.session.user.username, firstLetter: firstLetter   });
        }


        const weatherDataPromises = favoriteCities.map(entry =>
            weatherService.getWeather(entry.city)
        );

        const weatherResults = await Promise.all(weatherDataPromises);

       /* weatherResults.forEach((weather, i) => {
            console.log(`Погода в ${favoriteCities[i].city}:`, weather);
        }); */

        res.render('index', { weatherResults: weatherResults, username: req.session.user.username, firstLetter: firstLetter });

    } catch (error) {
        console.error('Помилка при обробці запиту /:', error);
        return res.render('index', { weatherResults: [] , username: 'username', firstLetter: 'U' });
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

router.get("/add/city", async (req, res) => {
    try{
        const user = req.session.user;
        const city = req.query.city;
        await favoritService.addFavorit(user.id, city);
        res.redirect('/');
    } catch(err) {
        res.status(err.status || 500).json({ error: err.message });
    }
})


router.get("/logout", async (req, res) => {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
