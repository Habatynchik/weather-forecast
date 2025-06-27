const runQuery = require('../configurations/db')
const userQueries = require('./queries/userQueries')

const userRepository = {
    getAllUsers: () => {
    },
    getUserById: (id) => {
    },
    getUserByUsername: async (username) => {
        try {
            let data = await runQuery(userQueries.getUserByUsername, [username])
            return data.rows[0];
        } catch (error) {
            throw error;
        }
    },
    getUserByUsernameAndPassword: async (username, password) => {
        try {
            let data = await runQuery(userQueries.getUserByUsernameAndPassword, [username, password])
            return data.rows[0];
        } catch (error) {
            throw error;
        }
    },
    createUser: async (username, email, password) => {
        try {
            let data = await runQuery(userQueries.createUser, [username, email, password])
            return data.rows[0];
        } catch (error) {
            throw error;
        }
    },
    getAllFavoritesCities: async (user_id) => {
        try {
            let data = await runQuery(userQueries.FAVORITE_CITY, [user_id])
            return data.rows;
        } catch (error) {
            throw error;
        }
    },
    deleteCity: async (user_id, city) => {
        try {
            let data = await runQuery(userQueries.DELETE_CITY, [user_id, city])
            return data.rows;
        } catch (error) {
            throw new Error("ERROR DELETE CITY");
        }
    },
    addFavorites: async (user_id, favorites) => {
        try {
            let data = await runQuery(userQueries.ADD_FAVORITE_CITY, [user_id, favorites])
            return data.rows;
        } catch (error) {
            throw new Error("ERROR ADD CITY");
        }
    },
    saveWeatherQuery: async (city, temp, condition, humidity, wind, timestamp) => {
        try {
            let data = await runQuery(userQueries.SAVE_WEATHER_QUERY, [city, temp, condition, humidity, wind, timestamp])
            return data.rows;
        } catch (error) {
            throw new Error("ERROR SAVE WEATHER QUERY");
        }
    },
}


module.exports = userRepository;