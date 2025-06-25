const adminQueries = {
    countQueries: "SELECT q.userid, u.name AS username, COUNT(*) AS query_count FROM queries q JOIN users u ON q.userid = u.id GROUP BY u.name, q.userid ORDER BY q.userid ASC;",
    countCities: "SELECT city, COUNT(*) AS query_count FROM queries GROUP BY city ORDER BY query_count DESC;",
    getAllUsers: "SELECT id, name, email, role FROM users ORDER BY id ASC",
};

module.exports = adminQueries;