var express = require('express');
var router = express.Router();
let authService = require('../services/authServis')

/* GET home page. */
router.get('/signIn', function(req, res, next) {
    res.render('signIn');
});


router.post('/signIn', async function(req, res, next) {
    let username = req.body.username.toLocaleLowerCase().trim();
    let email = req.body.email.trim();
    let password = req.body.password;
    try {
        await authService.register(username, email,  password);
        let user = await authService.authenticate(username, password);
        req.session.user = {id: user.id, username:user.name};
        console.log(req.session.user);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('signIn', {error: error.message});
    }
});

router.get('/signUp', function(req, res, next) {
    res.render('signUp');
});


router.post('/signUp', async function(req, res, next) {
    let username = req.body.username.toLocaleLowerCase().trim();
    let password = req.body.password;
    try {
        let user = await authService.authenticate(username, password);
        req.session.user = {id: user.id, username:user.name};
        console.log(req.session.user);
        res.redirect('/');
    } catch (e) {
        console.log(e.message);
        res.render('signUp', {error: e.message});
    }
});

module.exports = router;