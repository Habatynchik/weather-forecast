const express = require('express');
const router = express.Router();
const favoriteCityService = require('../services/favoriteCityService');

router.get('/', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const favorites = await favoriteCityService.getFavoritesByUser(req.session.userId);
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });

    const { city } = req.body;
    if (!city) return res.status(400).json({ error: 'City is required' });

    try {
        const result = await favoriteCityService.addFavorite(req.session.userId, city);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:city', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });

    const city = req.params.city;
    try {
        await favoriteCityService.removeFavorite(req.session.userId, city);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;