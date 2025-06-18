import { Router } from "express";
import {
    getWeather,
    getForecast
} from "../services/weather.service.js";

const router = Router();

// GET /weather/:city  – поточна погода
router.get("/:city", async (req, res) => {
    try {
        const data = await getWeather(req.params.city);
        res.json(data);            // «як є», без обробки
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

// GET /weather/:city/forecast  – 5‑денний прогноз
router.get("/:city/forecast", async (req, res) => {
    try {
        const data = await getForecast(req.params.city);
        res.json(data);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

export default router;