function Outfit(condition) {
    const text = condition.toLowerCase();
    if (text.includes('rain')) return 'boots', 'jacket', 'umbrella', 'trousers';
    if (text.includes('cloud')) return 'shoes' , 't-shirt' , 'jacket';
    if (text.includes('clear')) return 'shoes' , 't-shirt' , 'shorts';
    if (text.includes('snow')) return 'boots' , 'jacket' , 'santa-hat' , 'trousers';
}

function getOutfitIcon(clothes) {
    const name = Outfit(clothes);
    return {
        static_outfit: `/icons/outfit/${name}.png`,
    };

    async function rendercurrentoutfit(outfit) {
        const {temp, condition, name, humidity, wind} = await fetchCurrentOutfit(clothes);
        const outfit = getOutfitIcon(clothes);

        const container = document.getElementById('current-outfit');
        container.style.display = 'flex';
        container.innerHTML = `
    <div class="today-weather">
      <input type="hidden" name="city" value="${name}">
      <h3 id="city" width="100" height="50"></h3>
      <h3>Today (${new Date().toLocaleDateString()})</h3>
      <img src="${icon.static}" data-hover="${icon.animated}" class="weather-icon-hover">
      <h1 id="current" width="100" height="50"></h1>
      </div>
    </div>
  `;
 const had_clothes = hat.png , santa-hat.png;
 const middle_clothes = jacket.png , t-shirt.png;
 const under_clothes = shorts.png , trousers.png;
 const shoes_clothes = boots.png , shoes.png;
 const umbrella = umbrella.png;
        async function renderforecastOutfit(outfit) {
            const {had_clothes , middle_clothes , under_clothes , shoes_clothes} = await fetchaForecastOutfit(clothes);
            const outfit = getOutfitIcon(clothes);

            const container = document.getElementById('forecast-outfit');
            container.style.display = 'flex';
            container.innerHTML = `
    <div class="forecast-outfit">
      <h3 id="city" width="100" height="50"></h3>
      <h3>Today (${new Date().toLocaleDateString()})</h3>
      <img src="${icon.static_outfit}" data-hover="${icon.animated_outfit}" class="outfit-icon-hover">
      <h1 id="current" width="100" height="50"></h1>
      </div>
    </div>
  `;
            document.querySelectorAll('.outfit-icon-hover').forEach(img => {
                const animated = img.dataset.hover;
                const staticSrc = img.src;
                img.addEventListener('mouseenter', () => img.src = animated);
                img.addEventListener('mouseleave', () => img.src = staticSrc);
            });
        }
        async function fetchCurrentOutfit(clothes) {
            const res = await fetch(`/oyutfit/current/${clothes}`);
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
