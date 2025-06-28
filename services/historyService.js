const db = require("../db");

const getLastWeatherQueriesByUserId = async (userId) => {
    const query = `
        SELECT city, temperature, cloudiness, wind, request_time
        FROM weather_requests
        WHERE userid = $1
        ORDER BY request_time DESC
        LIMIT 5;
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
};

module.exports = {
    getLastWeatherQueriesByUserId,
};