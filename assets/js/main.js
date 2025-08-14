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

// Index page carousel
const indexCarousel = document.getElementById('index-carousel');
const indexPrevBtn = document.getElementById('index-prev-btn');
const indexNextBtn = document.getElementById('index-next-btn');

let indexSlide = 0;
const indexTotal = indexCarousel.children.length;

function showIndexSlide(i) {
    if (i < 0) indexSlide = indexTotal - 1;
    else if (i >= indexTotal) indexSlide = 0;
    else indexSlide = i;

    indexCarousel.style.transform = `translateX(-${indexSlide * 100}%)`;
}

indexPrevBtn.addEventListener('click', () => showIndexSlide(indexSlide - 1));
indexNextBtn.addEventListener('click', () => showIndexSlide(indexSlide + 1));

