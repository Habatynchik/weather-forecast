var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

$(document).ready(async function () {
    let API_KEY = "7d68e4099ddbe436ed8eb46a4b753984"
    let q = "Kyiv"

    let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${API_KEY}&units=metric`, {
        method: "GET"
    })

    data = await data.json()

    console.log(data.list)


    let arr = []
    data.list.forEach(element => {
        if (!arr[new Date(element.dt_txt).getDay()]) {
            arr.push([])
        }
        arr[new Date(element.dt_txt).getDay()].push({
            temp: element.main.temp,
            time: `${new Date(element.dt_txt).getHours()} hour`
        })
    });


    console.log(arr)


    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: arr[1].map(e => e.time),
            datasets: [{
                label: 'Temp',
                data: arr[1].map(e => e.temp),
                borderWidth: 3
            }]
        },

    });
});

module.exports = router;