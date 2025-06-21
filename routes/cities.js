let express = require('express');
let router = express.Router();
let citiesService = require('../services/citiesService');


router.get('/cities', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Потрібен параметр q' });
    try {
        let cities = await citiesService.getCities(query)
        res.json(cities);
    } catch (err) {
        res.status(500).json({ error: 'Помилка при пошуку міста' });
    }
});

module.exports = router;
