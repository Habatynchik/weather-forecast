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
        if (e.which === 13) { // Коли натиснута клавіша Enter
            const city = $(this).val().trim(); 
            if (!city) return;
    
            $.ajax({
                type: "GET",
                url: `/get/${city}`,
                dataType: "json", 
                success: function (res) {
                    $(".weather").empty(); // Очищуємо блок перед новими даними
                    $(".weather").html(`
                        <h2>${res.city}</h2>
                        <p>${res.temp} °C, ${res.description}</p>
                        <p>Швидкість вітру: ${res.windSpeed} м/с</p>
                        <img src="http://openweathermap.org/img/wn/${res.img}@2x.png" alt="Погода іконка" />
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
