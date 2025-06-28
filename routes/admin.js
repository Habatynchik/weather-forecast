const express = require('express');
const router = express.Router();
const adminService = require('../Services/adminService')


router.get('/users', async function(req, res, next) {
    const user = req.session.user;
    if (!user || !user.username || !user.role || !user.id || user.role.toLowerCase() !== 'admin') {
        res.redirect('/');
    } else {
        const queries = await adminService.countQueries()
        const cities = await adminService.countCities()
        const users = await adminService.getAllUsers()
        console.log(queries, cities, users)
        res.render('admin', { queries: queries, cities, users });
    }

});

module.exports = router;