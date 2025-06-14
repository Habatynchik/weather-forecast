const express = require('express');
const router = express.Router();
const adminService = require('../Servises/adminService')


router.get('/users', function(req, res, next) {
    adminService.countQueries
        .then((chats) => {
            res.send(chats)
        })
        .catch((error) => {
            res.send(error)
        })
    res.render('admin');
});

module.exports = router;