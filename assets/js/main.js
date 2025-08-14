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
// Index page carousel (responsive)
// ------------------------
const indexCarousel = document.getElementById('index-carousel');
const indexPrevBtn = document.getElementById('index-prev-btn');
const indexNextBtn = document.getElementById('index-next-btn');

if (indexCarousel && indexPrevBtn && indexNextBtn) {
    let indexSlide = 0;
    const indexTotal = indexCarousel.children.length;

    function getImagesPerView() {
        return window.innerWidth < 640 ? 1 : 2; // 1 image on mobile, 2 on desktop
    }

    function showIndexSlide(i) {
        const perView = getImagesPerView();
        // Looping
        if (i < 0) indexSlide = indexTotal - perView;
        else if (i > indexTotal - perView) indexSlide = 0;
        else indexSlide = i;

        const translatePercent = (indexSlide * 100) / perView;
        indexCarousel.style.transform = `translateX(-${translatePercent}%)`;
    }

    indexPrevBtn.addEventListener('click', () => showIndexSlide(indexSlide - 1));
    indexNextBtn.addEventListener('click', () => showIndexSlide(indexSlide + 1));

    // Recalculate on resize
    window.addEventListener('resize', () => showIndexSlide(indexSlide));

    // Initial display
    showIndexSlide(0);
}
