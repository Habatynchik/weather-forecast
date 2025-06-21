const express = require('express');
const router = express.Router();
const adminService = require('../Servises/adminService')


router.get('/users', async function(req, res, next) {
    const queries = await adminService.countQueries()
    const cities = await adminService.countCities()
    const users = await adminService.getAllUsers()
    console.log(queries)
    res.render('admin');
});

module.exports = router;