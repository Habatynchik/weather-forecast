const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('chart'); // Ми рендеримо chart.ejs
});

module.exports = router;