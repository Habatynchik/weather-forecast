const API_KEY = '7d68e4099ddbe436ed8eb46a4b753984';

$('#search').click(async () => {
    const q = $('#city').val();
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${API_KEY}&units=metric`);
    const json = await res.json();
    const list = json.list;

    const days = {};

    list.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toISOString().split('T')[0];

        if (!days[day]) days[day] = [];
        days[day].push({
            temp: item.main.temp,
            time: `${date.getHours()}:00`,
            weather: item.weather[0]
        });
    });

    const container = $('#forecast');
    container.empty();

    Object.keys(days).slice(0, 4).forEach((day, i) => {
        const chartId = `chart-${i}`;
        const iconUrl = getWeatherIcon(days[day]);

        container.append(`
            <div class="day-forecast">
                <div class="weather-icon"><img src="${iconUrl}" alt="icon"></div>
                <canvas id="${chartId}" height="200"></canvas>
            </div>
        `);

        new Chart(document.getElementById(chartId), {
            type: 'line',
            data: {
                labels: days[day].map(e => e.time),
                datasets: [{
                    label: 'Temp (°C)',
                    data: days[day].map(e => e.temp),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    });
});

function getWeatherIcon(entries) {
    // Пріоритет: дощ > вітер > сонце > інше
    let rain = entries.some(e => e.weather.main.toLowerCase().includes('rain'));
    let wind = entries.some(e => e.weather.main.toLowerCase().includes('wind'));
    let clear = entries.some(e => e.weather.main.toLowerCase().includes('clear'));

    if (rain) return 'https://openweathermap.org/img/wn/10d.png';
    if (wind) return 'https://openweathermap.org/img/wn/50d.png';
    if (clear) return 'https://openweathermap.org/img/wn/01d.png';

    return 'https://openweathermap.org/img/wn/03d.png'; // default: clouds
}
