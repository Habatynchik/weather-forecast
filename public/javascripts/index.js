$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/get/recommended",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $(".recommended").empty(); 
            
            res.forEach(cityWeather => {
                const placeHtml = `
                    <div class="place">
                        <div class="place-header">
                            <h2>${cityWeather.city}</h2>
                            <img src="http://openweathermap.org/img/wn/${cityWeather.img}@2x.png" alt="Погода іконка">
                        </div>
                        <p>${cityWeather.temp} °C, ${cityWeather.description}</p> <br>
                        <p>Швидкість вітру: ${cityWeather.windSpeed} м/с</p>
                    </div>
                `;
                $(".recommended").append(placeHtml);
            });
        },
        error: function () {
            $(".recommended").html("<p>Не вдалося завантажити дані.</p>");
        }
    });
    

    $(".city-name").on("keypress", function (e) {
        if (e.which === 13) {
            const city = $(this).val().trim(); 
            if (!city) return;
    
            $.ajax({
                type: "GET",
                url: `/get/${city}`,
                dataType: "json", 
                success: function (res) {
                    $(".weather").empty();
                    $(".weather").html(`
                        <div class="wetherSearch">
                <div class="wetherBar">
                    <img class="wetherImg" src="http://openweathermap.org/img/wn/${res.img}@2x.png" alt="Погода іконка">
                    <h1>${res.city}</h1>
                </div>
                <h1>Температура: ${res.temp} °C</h1>
                <h1>Опис: ${res.description}</h1>
                <h1>Швидкість вітру: ${res.windSpeed} м/с</h1>
            </div>
                        
                    `);
                },
                error: function(err) {
                    $(".weather").html(`<p>Місто не знайдено</p>`);
                    console.error(err);
                }
            });
        }
    });
    
    
});
