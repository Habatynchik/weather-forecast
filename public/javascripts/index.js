const burgerBtn = document.getElementById('burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');

    function toggleMenu() {
    burgerMenu.classList.toggle('visible');
    const isVisible = burgerMenu.classList.contains('visible');
    burgerBtn.setAttribute('aria-expanded', isVisible);
}

    burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

    document.addEventListener('click', () => {
    burgerMenu.classList.remove('visible');
    burgerBtn.setAttribute('aria-expanded', false);
});

    burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation(); // не ховає меню при кліку всередині
});
