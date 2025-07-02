const clothes = Outfit(condition, temp);
function Outfit(condition, temp) {
    const weather = condition.toLowerCase();

    // Температурна перевірка:
    if (temp >= 15) {
        // Легкий одяг
        if (weather.includes('rain')) return ['umbrella', 'jacket', 'trousers', 'shoes'];
        if (weather.includes('cloud')) return ['jacket', 't-shirt', 'shoes'];
        if (weather.includes('clear')) return ['t-shirt', 'shorts', 'shoes'];
        return ['t-shirt', 'shoes'];
    } else {
        // Зимовий одяг
        if (weather.includes('rain')) return ['umbrella', 'jacket', 'trousers', 'boots'];
        if (weather.includes('snow')) return ['santa-hat', 'jacket', 'trousers', 'boots'];
        if (weather.includes('cloud')) return ['hat', 'jacket', 'trousers', 'shoes'];
        return ['hat', 'jacket', 'trousers', 'shoes'];
    }
}
async function renderCurrentOutfit(condition, temp, name) {
    const clothes = Outfit(condition, temp);
    applyOutfit(clothes);

    const container = document.getElementById('current-outfit');
    container.style.display = 'flex';
    container.innerHTML = `
        <div class="today-weather">
          <h3>${name}</h3>
          <h3>Today (${new Date().toLocaleDateString()})</h3>
        </div>`;
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

async function renderForecastOutfit(outfit) {
    const layers = {
        'head-layer': document.getElementById('head-layer'),
        'top-layer': document.getElementById('top-layer'),
        'bottom-layer': document.getElementById('bottom-layer'),
        'shoes-layer': document.getElementById('shoes-layer'),
        'umbrella-layer': document.getElementById('umbrella-layer'),
    };

    const container = document.getElementById('forecast-outfit');
    container.style.display = 'flex';
    container.innerHTML = `
    <div class="forecast-outfit">
      <h3 id="city" width="100" height="50"></h3>
      <h3>Today (${new Date().toLocaleDateString()})</h3>
      <h1 id="current" width="100" height="50"></h1>
      </div>
    </div>
  `;
    document.querySelectorAll('.outfit-hover').forEach(img => {
        const animated = img.dataset.hover;
        const staticSrc = img.src;
        img.addEventListener('mouseenter', () => img.src = animated);
        img.addEventListener('mouseleave', () => img.src = staticSrc);
    });
}
/*
async function fetchCurrentOutfit(clothes) {
    const res = await fetch(`/outfit/current/${clothes}`);
    const data = await res.json();
    return {
        static_outfit
    };
}

async function fetchForecastOutfit(clothes) {
    const res = await fetch(`/outfit/forecast/${clothes}`);
    const data = await res.json();
    return {
        static_outfit
    };
}
*/
function getLayerForClothing(itemName) {
    return outfitCategories[itemName] || null;
}

function applyOutfit(clothes) {
    clothes.forEach(item => {
        const layerId = getLayerForClothing(item);
        if (layerId) {
            const layerEl = document.getElementById(layerId);
            if (layerEl) {
                const img = document.createElement('img');
                img.src = `/icons/outfit/${item}.png`;
                img.alt = item;
                layerEl.innerHTML = ''; // очищення шару перед додаванням
                layerEl.appendChild(img);
            }
        }
    });
}

