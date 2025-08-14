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
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Gallery Carousel
const carousel = document.getElementById('gallery-carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let index = 0;
const total = carousel.children.length;

function showSlide(i) {
    if (i < 0) index = total - 1;
    else if (i >= total) index = 0;
    else index = i;

    carousel.style.transform = `translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Optional: Auto-slide every 5 seconds
setInterval(() => showSlide(index + 1), 5000);
