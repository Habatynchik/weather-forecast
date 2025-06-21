require('dotenv').config('../.env');
const { Pool } = require('pg');

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

module.exports = runQuery;