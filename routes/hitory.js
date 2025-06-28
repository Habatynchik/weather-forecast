const express = require("express");
const router = express.Router();
const historyService = require("../services/historyService");

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const history = await historyService.getLastWeatherQueriesByUserId(userId);
        console.log(history);
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        console.error("Error in /history:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const historyService = require("../services/historyService");


router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const history = await historyService.getLastWeatherQueriesByUserId(userId);
        const username = "Користувач";
        console.log(history);
        res.render("history", { history, username });
    } catch (err) {
        console.error("Помилка при отриманні історії:", err);
        res.status(500).send("Помилка сервера");
    }
});

module.exports = router;

