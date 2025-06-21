const favoriteQueries = {
    addFavoriteCity: "INSERT INTO favorite_cities (user_id, city) VALUES ($1, $2) RETURNING *",
    removeFavoriteCity: "DELETE FROM favorite_cities WHERE user_id = $1 AND city = $2 RETURNING *",
    getFavoriteCities: "SELECT city FROM favorite_cities WHERE user_id = $1"
};

module.exports = favoriteQueries;