import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Потрібно вказати параметр city' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'ua'
                }
            }
        );

        const weather = response.data;
        res.json({
            city: weather.name,
            temperature: weather.main.temp,
            description: weather.weather[0].description,
            humidity: weather.main.humidity,
            wind_speed: weather.wind.speed
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Місто не знайдено' });
        } else {
            res.status(500).json({ error: 'Помилка при отриманні даних з OpenWeather' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
