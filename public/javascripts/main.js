const profileBtn = document.getElementById('profileBtn');
const burgerMenu = document.getElementById('burgerMenu');

function toggleMenu() {
    const isVisible = burgerMenu.style.display === 'block';
    burgerMenu.style.display = isVisible ? 'none' : 'block';
    profileBtn.setAttribute('aria-expanded', !isVisible);
}

profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', () => {
    burgerMenu.style.display = 'none';
    profileBtn.setAttribute('aria-expanded', false);
});

// Prevent closing when clicking inside menu
burgerMenu.addEventListener('click', e => e.stopPropagation());

// WEATHER FORM HANDLING

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const cityNameEl = document.getElementById('cityName');
const temperatureEl = document.getElementById('temperature');
const weatherDescriptionEl = document.getElementById('weatherDescription');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;

    // MOCK weather data (replace with real API call if you want)
    // For demo, randomly generate temperature and pick description
    const temp = (Math.random() * 30 + 5).toFixed(1); // 5 to 35 C
    const descriptions = ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Snowy', 'Foggy'];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];

    cityNameEl.textContent = city;
    temperatureEl.textContent = `${temp} °C`;
    weatherDescriptionEl.textContent = description;

    weatherResult.classList.remove('hidden');
});
