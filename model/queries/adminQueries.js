const adminQueries = {
    countQueries: "SELECT userid, COUNT(*) AS query_count FROM query GROUP BY userid;",
    countCities: "SELECT city, COUNT(*) AS query_count FROM queries GROUP BY city ORDER BY query_count DESC;",
    getAllUsers: "SELECT id, name, email, role FROM users ORDER BY id ASC",
};

module.exports = adminQueries;