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
        name: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
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
    const { temp, condition, name, humidity, wind } = await fetchCurrentWeather(city);
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
       <p id="wind"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg> ${wind} m/s</p>
       <p id="humidity"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16">
  <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"/>
</svg> ${humidity}</p>
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


async function renderForecast(city) {
    const container = document.getElementById('forecast-container');
    container.style.display = 'flex'; // ✅ це обов’язково
    const list = await fetchWeather(city);
    const grouped = groupByDay(list);
    container.innerHTML = '';

    grouped.forEach(([day, entries], i) => {
        const avgTemp = Math.round(entries.reduce((sum, e) => sum + e.temp, 0) / entries.length);
        const condition = entries[0].condition;

        const wrapper = document.createElement('div');
        wrapper.className = 'forecast-day-wrapper';

        const weatherDiv = document.createElement('div');
        weatherDiv.className = 'forecast-day';
        weatherDiv.innerHTML = `
        <h3>${day}</h3>
        <img src="/icons/static/${normalizeCondition(condition)}.png" class="weather-icon-hover">
        <canvas id="chart-${i}" width="250" height="100"></canvas>
    `;

        const clothes = Outfit(condition, avgTemp);
        const outfitDiv = renderForecastOutfit(clothes);

        wrapper.appendChild(weatherDiv);
        wrapper.appendChild(outfitDiv);
        container.appendChild(wrapper);

        const ctx = document.getElementById(`chart-${i}`);
        createChart(ctx, entries.map(e => e.time), entries.map(e => e.temp));
    });
}
// === CITY SEARCH ===
const input = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');

input.addEventListener('input', async () => {
    const query = input.value.trim();

    if (query.length < 2) {
        suggestions.classList.remove('show');
        suggestions.style.display = 'none';
        return;
    }

    try {
        const res = await fetch(`/cities?q=${query}`);
        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }

        const cities = await res.json();

        suggestions.innerHTML = '';

        if (Array.isArray(cities) && cities.length > 0) {
            cities.forEach(city => {
                const li = document.createElement('li');
                li.textContent = `${city.name}, ${city.country}`;
                li.addEventListener('click', () => {
                    input.value = city.name;
                    suggestions.classList.remove('show');
                    suggestions.style.display = 'none';
                    handleCitySearch(city.name);
                });
                suggestions.appendChild(li);
            });
            suggestions.style.display = 'block';
            suggestions.classList.add('show');
        } else {
            suggestions.classList.remove('show');
            suggestions.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
});

$('.search-icon').on('click', () => {
    const city = input.value.trim();
    handleCitySearch(city);
});
$('#search_btn').on('click', () => {
    const city = input.value.trim();
    handleCitySearch(city);
});
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const city = input.value.trim();
        handleCitySearch(city);
    }
});

async function handleCitySearch(city) {
    if (city) {
        const current = await fetchCurrentWeather(city);             // 1. Отримуємо поточну погоду
        await renderCurrentWeather(city);                            // 2. Малюємо поточну погоду
        await renderCurrentOutfit(current.condition, current.temp);  // 3. Малюємо одяг
        await renderForecast(city);                                  // 4. Малюємо прогноз
        input.value = city;
        suggestions.style.display = 'none';
    }
}
// --- Outfit Logic ---


function Outfit(condition, temp) {
    const weather = condition.toLowerCase();
    if (temp >= 15) {
        if (weather.includes('rain')) return ['umbrella', 'jacket', 'trousers', 'shoes'];
        if (weather.includes('cloud')) return ['jacket', 't-shirt', 'shoes'];
        if (weather.includes('clear')) return ['t-shirt', 'shorts', 'shoes'];
        return ['t-shirt', 'shoes'];
    } else {
        if (weather.includes('rain')) return ['umbrella', 'jacket', 'trousers', 'boots'];
        if (weather.includes('snow')) return ['santa-hat', 'jacket', 'trousers', 'boots'];
        if (weather.includes('cloud')) return ['hat', 'jacket', 'trousers', 'shoes'];
        return ['hat', 'jacket', 'trousers', 'shoes'];
    }
}
const outfitCategories = {
    'hat': 'head-layer',
    'santa-hat': 'head-layer',
    'jacket': 'top-layer',
    't-shirt': 'top-layer',
    'shorts': 'bottom-layer',
    'trousers': 'bottom-layer',
    'boots': 'shoes-layer',
    'shoes': 'shoes-layer',
    'umbrella': 'umbrella-layer'
};

function getLayerForClothing(itemName) {
    return outfitCategories[itemName] || null;
}

function applyOutfit(clothes, prefix = '') {
    Object.values(outfitCategories).forEach(layer => {
        const el = document.getElementById(`${prefix}${layer}`);
        if (el) el.innerHTML = '';
    });

    clothes.forEach(item => {
        const layer = getLayerForClothing(item);
        const el = document.getElementById(`${prefix}${layer}`);
        if (el) {
            const img = document.createElement('img');
            img.src = `/icons/outfit/${item}.png`;
            img.alt = item;
            el.appendChild(img);
        }
    });
}

async function renderCurrentOutfit(condition, temp) {
    const clothes = Outfit(condition, temp);
    const container = document.getElementById('current-outfit');
    container.style.display = 'flex';

    container.innerHTML = `
        <div class="outfit-wrapper-inner">
            <img src="/icons/outfit/standing-man.png" alt="Base Man">
            <div id="head-layer" class="outfit-layer"></div>
            <div id="top-layer" class="outfit-layer"></div>
            <div id="bottom-layer" class="outfit-layer"></div>
            <div id="shoes-layer" class="outfit-layer"></div>
            <div id="umbrella-layer" class="outfit-layer"></div>
        </div>
    `;

    applyOutfit(clothes);
}


function applyForecastOutfit(clothes, parent) {
    const base = document.createElement('img');
    base.src = '/icons/outfit/standing-man.png';
    base.alt = 'Base Man';
    base.style.position = 'absolute';
    base.style.zIndex = '0';
    parent.appendChild(base);

    clothes.forEach(item => {
        const layer = outfitCategories[item];
        const div = document.createElement('div');
        div.classList.add('outfit-layer', layer);
        const img = document.createElement('img');
        img.src = `/icons/outfit/${item}.png`;
        img.alt = item;
        div.appendChild(img);
        parent.appendChild(div);
    });
}
function renderForecastOutfit(clothes) {
    const container = document.createElement('div');
    container.className = 'forecast-outfit';

    container.innerHTML = `
        <div class="outfit-wrapper-inner">
            <img src="/icons/outfit/standing-man.png" alt="Base Man" class="base-man">
            <div class="outfit-layer head-layer"></div>
            <div class="outfit-layer top-layer"></div>
            <div class="outfit-layer bottom-layer"></div>
            <div class="outfit-layer shoes-layer"></div>
            <div class="outfit-layer umbrella-layer"></div>
        </div>
    `;

    clothes.forEach(item => {
        const layer = getLayerForClothing(item);
        const layerDiv = container.querySelector(`.${layer}`);
        if (layerDiv) {
            const img = document.createElement('img');
            img.src = `/icons/outfit/${item}.png`;
            img.alt = item;
            img.classList.add('clothing-item');
            layerDiv.appendChild(img);
        }
    });

    return container;
}




