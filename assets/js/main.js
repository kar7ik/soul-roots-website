const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

// Toggle menu when hamburger is clicked
menuBtn.addEventListener('click', function () {
    navMenu.classList.toggle('hidden');
    menuBtn.setAttribute(
        'aria-expanded',
        navMenu.classList.contains('hidden') ? 'false' : 'true'
    );
});

// Close menu when close (X) button is clicked
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', function () {
        navMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
}

// Optional: Close menu when any mobile nav link is clicked
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded',