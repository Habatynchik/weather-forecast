const adminRepository = require('../model/adminRepository');

const adminService = {
    countQueries: async () => {
        return await adminRepository.countQueries;
    },
    countCities: async () => {
        return await adminRepository.countCities;
    },
    getAllUsers: async () => {
        return await adminRepository.getAllUsers;
    },
}

module.exports = adminService