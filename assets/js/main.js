// ------------------------
// Mobile Menu
// ------------------------
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

// Close menu when any mobile nav link is clicked
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Optional: add shadow or style when scrolling
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ------------------------
// Index page carousel (2 images visible)
// ------------------------
const indexCarousel = document.getElementById('index-carousel');
const indexPrevBtn = document.getElementById('index-prev-btn');
const indexNextBtn = document.getElementById('index-next-btn');

if (indexCarousel && indexPrevBtn && indexNextBtn) {
    let indexSlide = 0;
    const indexTotal = indexCarousel.children.length;

    function showIndexSlide(i) {
        // Looping carousel
        if (i < 0) indexSlide = indexTotal - 2; // last 2 images
        else if (i > indexTotal - 2) indexSlide = 0; // reset
        else indexSlide = i;

        // Translate carousel by percentage (each image = 50%)
        indexCarousel.style.transform = `translateX(-${indexSlide * 50}%)`;
    }

    indexPrevBtn.addEventListener('click', () => showIndexSlide(indexSlide - 1));
    indexNextBtn.addEventListener('click', () => showIndexSlide(indexSlide + 1));

    // Optional: start at first slide
    showIndexSlide(0);
}
