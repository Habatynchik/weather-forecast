$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/get/recommended",
        dataType: "json",
        success: function (res) {
            console.log(res)
            $(".recommended").empty(); 
            res.forEach(cityWeather => {
                $(".recommended").append(`
                    <h2>${cityWeather.city}</h2>
                    <p>${cityWeather.temp} °C, ${cityWeather.description}</p>
                    <p>Швидкість вітру: ${cityWeather.windSpeed} м/с</p>
                    <img src="http://openweathermap.org/img/wn/${cityWeather.img}@2x.png" alt="Погода іконка" />
                `);
            });
        }
    });
});
