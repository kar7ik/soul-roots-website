const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', function () {
    navMenu.classList.toggle('hidden');
    menuBtn.setAttribute(
        'aria-expanded',
        navMenu.classList.contains('hidden') ? 'false' : 'true'
    );
});