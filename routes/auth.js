let express = require('express');
let router = express.Router();
let authService = require('../services/authService')

router.get('/login', function(req, res, next) {
    res.render('login', {error: null});
});

router.post('/login', async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    try {
        let user = await authService.authenticate(username, password);
        req.session.user = {id: user.id, username:user.username};
        res.redirect('/');
    } catch (error) {
        res.render('login', {error: error.message});
    }
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    try {
        let user = await authService.register(username, password);
    } catch (e) {
        res.render('login', {error: e.message});
    }
});

router.post('/logout', async function (req, res, next) {
    req.session.user = null;
    res.redirect('/');
})

module.exports = router;