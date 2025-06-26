const profileBtn = document.getElementById('burger-btn');
const burgerMenu = document.querySelector('.burger-menu');

function toggleMenu() {
    const isVisible = burgerMenu.style.display === 'block';
    burgerMenu.style.display = isVisible ? 'none' : 'block';
    profileBtn.setAttribute('aria-expanded', !isVisible);
}

profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});


document.addEventListener('click', () => {
    burgerMenu.style.display = 'none';
    profileBtn.setAttribute('aria-expanded', false);
});

// Prevent closing when clicking inside menu
burgerMenu.addEventListener('click', e => e.stopPropagation());
