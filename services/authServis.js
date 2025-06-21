const userRepository = require('../model/userRepository');
const bcrypt = require('bcrypt');

const authService = {
    register: async (username, password) => {
        password = bcrypt.hashSync(password, 10);
        let user = await userRepository.getUserByUsername(username);
        if (user) {
            throw new Error("Username already exist ");
        }
        return await userRepository.createUser(username, password);
    },
    authenticate: async (username, password) => {
        let user = await userRepository.getUserByUsername(username);
        if (!user) {
            throw new Error("Username not found");
        }
        let isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            return user
        } else {
            throw new Error("Username or password is invalid.");
        }
    },
    logout: async () => {
    }
};

module.exports = authService;