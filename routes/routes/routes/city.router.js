import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const CITY_API_KEY = process.env.NINJASCITY_API_KEY;

router.get('/cities', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Потрібен параметр q' });

    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/city', {
            params: { name: query },
            headers: { 'X-Api-Key': CITY_API_KEY },
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Помилка при пошуку міста' });
    }
});

export default router;