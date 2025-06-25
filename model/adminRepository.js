const runQuery = require('../configurations/db')
const adminQueries = require('./queries/adminQueries')

const adminRepository = {
    countQueries: async () =>{
        try {
            let data = await runQuery(adminQueries.countQueries)
            return data.rows;
        } catch (error) {
            throw error;
        }
    },
    countCities: async () =>{
        try {
            let data = await runQuery(adminQueries.countCities)
            return data.rows;
        } catch (error) {
            throw error;
        }
    },
    getAllUsers: async () =>{
        try {
            let data = await runQuery(adminQueries.getAllUsers)
            return data.rows;
        } catch (error) {
            throw error;
        }
    },
}

module.exports = adminRepository;