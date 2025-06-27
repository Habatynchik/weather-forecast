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
        condition: data.weather[0].description,
        name: data.name
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
            condition: item.weather[0].description,
            humidity: item.main.humidity,
            wind: item.wind.speed,
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
    const { temp, condition, name } = await fetchCurrentWeather(city);
    const icon = getWeatherIcon(condition);

    const container = document.getElementById('current-container');
    container.style.display = 'flex';
    container.innerHTML = `
    <div class="today-weather">
      <form class="form" action="/add/city" method="get">
      <input type="hidden" name="city" value="${name}">
      <button id="add" type="submit"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
      </svg></button>
      </form>
      <h3 id="city" width="100" height="50"></h3>
      <h3>Today (${new Date().toLocaleDateString()})</h3>
      <img src="${icon.static}" data-hover="${icon.animated}" class="weather-icon-hover">
      <h1 id="current" width="100" height="50"></h1>
      <div class="wind_humidity">
       <p id="wind"></p>
       <p id="humidity"></p>
      </div>
    </div>
  `;
    document.getElementById('current').innerHTML=`${temp}°C`;
    document.getElementById('city').innerHTML=`${name}`;
   /* document.getElementById('wind').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg> ${wind}`;
    document.getElementById('humidity').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16">
  <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"/>
</svg> ${humidity}`; */


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