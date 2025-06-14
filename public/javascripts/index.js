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

    $(".city-name").on("change", function () {
        const city = $(this).val(); 
        $.ajax({
            type: "GET",
            url: `/get/${city}`,
            dataType: "json", 
            success: function (res) {
                $(".weather").html(`
                    <h2>${res.city}</h2>
                    <p>${res.temp} °C, ${res.description}</p>
                    <p>Швидкість вітру: ${res.windSpeed} м/с</p>
                    <img src="http://openweathermap.org/img/wn/${res.img}@2x.png" alt="Погода іконка" />
                `);
            },
            error: function(err) {
                $(".weather").html(`<p>Помилка при завантаженні погоди</p>`);
                console.error(err);
            }
        });
    });
    
});
