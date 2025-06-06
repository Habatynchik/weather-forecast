const API_KEY = '7d68e4099ddbe436ed8eb46a4b753984';

function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes('rain')) return '/icons/icons8-rain.gif';
    if (condition.includes('cloud')) return '/icons/icons8-party-cloudy-day.gif';
    if (condition.includes('clear')) return '/icons/icons8-cloud.gif';
    if (condition.includes('snow')) return '/icons/icons8-light-snow.gif';
    return '/icons/default.png';
}

async function fetchWeather(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    return data.list;
}

function groupByDay(list) {
    const days = {};
    list.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toDateString();
        if (!days[day]) days[day] = [];
        days[day].push({
            temp: item.main.temp,
            time: `${date.getHours()}:00`,
            condition: item.weather[0].description
        });
    });
    return Object.entries(days).slice(0, 4);
}

function createChart(ctx, labels, data) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Температура (°C)',
                data: data,
                borderWidth: 2,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.3
            }]
        },
        options: {
            responsive: true
        }
    });
}

async function renderForecast(city) {
    const list = await fetchWeather(city);
    const grouped = groupByDay(list);
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';

    grouped.forEach(([day, entries], i) => {
        const div = document.createElement('div');
        div.className = 'forecast-day';

        const condition = entries[0].condition.toLowerCase();
        const icon = getWeatherIcon(condition);

        div.innerHTML = `
            <h3>${day}</h3>
            <img src="${icon}" alt="${condition}" class="weather-icon">
            <canvas id="chart-${i}" width="300" height="100"></canvas>
        `;

        container.appendChild(div);
        const ctx = document.getElementById(`chart-${i}`);
        createChart(ctx, entries.map(e => e.time), entries.map(e => e.temp));
    });
}

document.getElementById('city').addEventListener('change', (e) => {
    renderForecast(e.target.value);
});

window.onload = () => renderForecast('Kyiv');