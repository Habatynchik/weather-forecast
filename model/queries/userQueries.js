const userQueries = {
    getUserByUsername: "SELECT * FROM users WHERE username = $1",
    getUserById: "SELECT * FROM users WHERE id = $1",
    getUserByUsernameAndPassword: "SELECT * FROM users WHERE username = $1 AND password = $2",
    createUser: "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    DELETE_USER: "",
    UPDATE_USER: "",
};

module.exports = userQueries;