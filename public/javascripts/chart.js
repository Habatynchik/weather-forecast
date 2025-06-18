function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes('rain')) return '/icons/icons8-rain.gif';
    if (condition.includes('cloud')) return '/icons/icons8-partly-cloudy-day.gif';
    if (condition.includes('clear')) return '/icons/icons8-cloud.gif';
    if (condition.includes('snow')) return '/icons/icons8-light-snow.gif';
    return '/icons/default.png';
}

async function fetchWeather(city) {
    const res = await fetch(`/weather/forecast/${city}`);
    const data = await res.json();
    console.log(data);
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

/*const input = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');
let selectedCity = '';

input.addEventListener('input', async () => {
    const query = input.value.trim();
    if (!query) return (suggestions.innerHTML = '');

    const res = await fetch(`/cities?q=${query}`);
    const cities = await res.json();

    suggestions.innerHTML = '';
    cities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = `${city.name}, ${city.country}`;
        li.addEventListener('click', () => {
            input.value = city.name;
            selectedCity = city.name;
            suggestions.innerHTML = '';
        });
        suggestions.appendChild(li);
    });
});*/

document.getElementById('getForecast').addEventListener('click', async () => {
    const city = selectedCity || input.value.trim();
    if (!city) return alert('Введіть місто');

    const res = await fetch(`/api/forecast/${city}`);
    const data = await res.json();

    // тут вже фронтенд обробляє те, що надійшло з бекенду
    document.getElementById('weatherResult').classList.remove('hidden');
    document.getElementById('cityName').textContent = data.city.name;
    document.getElementById('temperature').textContent = `Температура: ${data.list[0].main.temp}°C`;
    document.getElementById('weatherDescription').textContent = `Опис: ${data.list[0].weather[0].description}`;
});

window.onload = () => renderForecast('Kyiv');