const express = require('express');
const router = express.Router();
const db = require('../db');
const historyQueries = require('../queries/historyQueries');

router.post('/history', async (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const { city } = req.body;
    try {
        await db.query(historyQueries.addHistoryEntry, [req.session.user.id, city]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/history', async (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    try {
        const result = await db.query(historyQueries.getRecentHistory, [req.session.user.id]);
        res.json(result.rows.map(r => r.city));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;