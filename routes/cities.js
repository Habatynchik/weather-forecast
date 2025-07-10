let express = require('express');
let router = express.Router();
let citiesService = require('../services/citiesService');


router.get('/', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Потрібен параметр q' });
    try {
        let cities = await citiesService.getCities(query)
        res.json(cities);
    } catch (err) {
        res.status(500).json({ error: 'Помилка при пошуку міста' });
    }
});
try {
    const { q } = req.query;
    const response = await axios.get('https://api.api-ninjas.com/v1/city', {
        params: { name: q },
        headers: {
            'X-Api-Key': process.env.API_NINJA_KEY
        }
    });
    res.json(response.data);
} catch (error) {
    console.error('Error from API Ninjas:', error.message);
    res.status(500).json([]);
}
module.exports = router;
