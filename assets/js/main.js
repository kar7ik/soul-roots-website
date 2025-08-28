// Menu toggle
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', navMenu.classList.contains('hidden') ? 'false' : 'true');
});

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        navMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
}

document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Scroll header effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// Index carousel
const indexCarousel = document.getElementById('index-carousel');
const indexPrevBtn = document.getElementById('index-prev-btn');
const indexNextBtn = document.getElementById('index-next-btn');

let indexSlide = 0;
let slideCount = 2; // default for desktop

function updateSlideCount() {
    if (window.innerWidth < 768) slideCount = 1;
    else slideCount = 2;
}

updateSlideCount();
window.addEventListener('resize', () => {
    updateSlideCount();
    showIndexSlide(indexSlide); // update transform
});

function showIndexSlide(i) {
    const total = indexCarousel.children.length;
    if (i < 0) indexSlide = total - slideCount;
    else if (i > total - slideCount) indexSlide = 0;
    else indexSlide = i;

    const percent = (indexSlide * (100 / slideCount));
    indexCarousel.style.transform = `translateX(-${percent}%)`;
}

if (indexPrevBtn && indexNextBtn && indexCarousel) {
    indexPrevBtn.addEventListener('click', () => showIndexSlide(indexSlide - 1));
    indexNextBtn.addEventListener('click', () => showIndexSlide(indexSlide + 1));
}
