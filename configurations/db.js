require('dotenv').config('../.env');
const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    max: process.env.DATABASE_POOL_SIZE,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.DATABASE_SSL
    }
});

async function runQuery(query, params = []) {
    const client = await pool.connect();
    try {
        return await client.query(query, params);
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function saveWeatherQuery({ userid, city, temp, humidity, wind_speed, date }) {
    try {
        const query = `INSERT INTO queries (userid, city, temp, humidity, wind_speed, date) VALUES ($1, $2, $3, $4, $5, $6)`;
        const values = [userid, city, temp, humidity, wind_speed, date];

        await pool.query(query, values);
    } catch (error) {
        console.error('Помилка при збереженні погоди:', error);
        throw error;
    }
}

    require('dotenv').config();
    console.log('Loaded ENV:', process.env.DATABASE_HOST);
    module.exports = runQuery;