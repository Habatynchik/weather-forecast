var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/signIn', function(req, res, next) {
    res.render('signIn');
});

router.get('/signUp', function(req, res, next) {
    res.render('signUp');
});

module.exports = router;