const userQueries = {
    getUserByUsername: "SELECT * FROM users WHERE name = $1",
    getUserById: "SELECT * FROM users WHERE id = $1",
    getUserByUsernameAndPassword: "SELECT * FROM users WHERE name = $1 AND password = $2",
    createUser: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    DELETE_USER: "",
    UPDATE_USER: "",
    FAVORITE_CITY: "SELECT city FROM favorite WHERE userid = $1",
    DELETE_CITY: "DELETE FROM favorite WHERE userid = $1 AND city = $2 RETURNING *",
    ADD_FAVORITE_CITY: "INSERT INTO favorite (userid, city) VALUES ($1, $2) RETURNING *;",
    SAVE_WEATHER_QUERY: "INSERT INTO queries (userid, city, temp, humidity, wind_speed, date) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *;",
    getLast5QueriesByUserId: "SELECT date, city, temp, humidity, wind_speed FROM queries WHERE userid = $1 ORDER BY date DESC LIMIT 5;",
};
module.exports = userQueries;