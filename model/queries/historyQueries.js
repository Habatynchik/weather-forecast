const historyQueries = {
    addHistoryEntry: `
        INSERT INTO view_history (user_id, city)
        VALUES ($1, $2);
    `,
    getRecentHistory: `
        SELECT city FROM view_history
        WHERE user_id = $1
        ORDER BY viewed_at DESC
        LIMIT 5;
    `
};

module.exports = historyQueries;