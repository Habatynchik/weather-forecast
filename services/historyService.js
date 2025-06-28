const userRepository = require("../model/userRepository");

async function getUserLast5Queries(userId) {
    if (!userId) throw new Error("User ID is required");

    return await userRepository.getLast5QueriesByUserId(userId);
}

module.exports = {
    getUserLast5Queries,
};
