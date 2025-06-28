
const express = require("express");
const router = express.Router();
const historyService = require("../services/historyService");
const userRepository = require("../model/userRepository");
const weatherService = require("../services/weatherService");

router.get("/", async (req, res) => {
    try {
        const userId = req.session?.user?.id;
        const sessionUser = req.session.user;

        if (!userId || !sessionUser) {
            return res.status(401).send("Not authenticated");
        }

        const data = await historyService.getUserLast5Queries(userId);
        const favoriteCities = await userRepository.getAllFavoritesCities(sessionUser.id);

        const firstLetter = req.session.user.username[0];
        if (!favoriteCities || favoriteCities.length === 0) {
            return res.render('history', {
                weatherResults: [],
                username: req.session.user.username,
                firstLetter: firstLetter,
                queries: data
            });
        }


        const weatherDataPromises = favoriteCities.map(entry =>
            weatherService.getWeather(entry.city)
        );

        const weatherResults = await Promise.all(weatherDataPromises);

        /* weatherResults.forEach((weather, i) => {
             console.log(`Погода в ${favoriteCities[i].city}:`, weather);
         }); */

        res.render('history', {
            weatherResults: weatherResults,
            username: req.session.user.username,
            firstLetter: firstLetter,
            queries: data
        });

    } catch (err) {
        console.error("Error in /user/history:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;


