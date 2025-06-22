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
