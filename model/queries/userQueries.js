const userQueries = {
    getUserByUsername: "SELECT * FROM users WHERE name = $1",
    getUserById: "SELECT * FROM users WHERE id = $1",
    getUserByUsernameAndPassword: "SELECT * FROM users WHERE name = $1 AND password = $2",
    createUser: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    DELETE_USER: "",
    UPDATE_USER: "",
};

module.exports = userQueries;