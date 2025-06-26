function normalizeCondition(condition) {
    const text = condition.toLowerCase();
    if (text.includes('rain')) return 'rain';
    if (text.includes('cloud')) return 'cloud';
    if (text.includes('clear')) return 'clear';
    if (text.includes('snow')) return 'snow';
    return 'default';
}

function getWeatherIcon(condition) {
    const name = normalizeCondition(condition);
    return {
        static: `/icons/static/${name}.png`,
        animated: `/icons/animated/${name}.gif`
    };
}

async function fetchCurrentWeather(city) {
    const res = await fetch(`/weather/current/${city}`);
    const data = await res.json();
    return {
        temp: data.main.temp,
        condition: data.weather[0].description
    };
}

async function fetchWeather(city) {
    const res = await fetch(`/weather/forecast/${city}`);
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
    return Object.entries(days).slice(0, 6);
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

async function renderCurrentWeather(city) {
    const { temp, condition } = await fetchCurrentWeather(city);
    const icon = getWeatherIcon(condition);

    const container = document.getElementById('current-container');
    container.style.display = 'flex';
    container.innerHTML = `
    <div class="today-weather">
      <h2>Сьогодні (${new Date().toLocaleDateString()})</h2>
      <img src="${icon.static}" data-hover="${icon.animated}" class="weather-icon-hover">
      <h1 id="current" width="100" height="50"></h1>
    </div>
  `;
    document.getElementById('current').innerHTML=`${temp}°C`;


    const currentImg = container.querySelector('.weather-icon-hover');
    currentImg.addEventListener('mouseenter', () => currentImg.src = icon.animated);
    currentImg.addEventListener('mouseleave', () => currentImg.src = icon.static);
}

// === RENDER FORECAST ===
async function renderForecast(city) {
    document.getElementById('forecast-container').style.display = 'flex';
    await renderCurrentWeather(city);
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
      <img src="${icon.static}" data-hover="${icon.animated}" class="weather-icon-hover">
      <canvas id="chart-${i}" width="300" height="100"></canvas>
    `;

        container.appendChild(div);
        const ctx = document.getElementById(`chart-${i}`);
        createChart(ctx, entries.map(e => e.time), entries.map(e => e.temp));
    });

    document.querySelectorAll('.weather-icon-hover').forEach(img => {
        const animated = img.dataset.hover;
        const staticSrc = img.src;
        img.addEventListener('mouseenter', () => img.src = animated);
        img.addEventListener('mouseleave', () => img.src = staticSrc);
    });
}

// === CITY SEARCH ===
const input = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');

input.addEventListener('input', async () => {
    const query = input.value.trim();

    if (query.length < 2) {
        suggestions.classList.remove('show');
        return;
    }

    try {
        const res = await fetch(`/cities?q=${query}`);
        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }

        const cities = await res.json();
        console.log(cities); // для дебагу

        suggestions.innerHTML = '';

        if (Array.isArray(cities) && cities.length > 0) {
            cities.forEach(city => {
                const li = document.createElement('li');
                li.textContent = `${city.name}, ${city.country}`;
                li.addEventListener('click', () => {
                    input.value = city.name;
                    suggestions.classList.remove('show');
                });
                suggestions.appendChild(li);
            });
            suggestions.style.display = 'inline-block';
            suggestions.classList.add('show');
        } else {
            suggestions.classList.remove('show');
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
});

$(document).on("click", "#suggestions li", function () {
    const city = $(this).text();
    handleCitySearch(city);
});

$('#search_btn').on('click', () => {
    const city = input.value;
    handleCitySearch(city);
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const city = input.value;
        handleCitySearch(city);
    }
});

function handleCitySearch(city) {
    if (city) {
        renderForecast(city.trim());
        input.value = city.trim();
        suggestions.style.display = 'none';
    }
}