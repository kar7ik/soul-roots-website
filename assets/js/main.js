// Menu toggle
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', navMenu.classList.contains('hidden') ? 'false' : 'true');
        // Prevent body scroll when menu is open
        if (!navMenu.classList.contains('hidden')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.add('hidden');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Close menu when clicking links
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.add('hidden');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// Close menu when clicking backdrop (replaces inline onclick)
const navMenuBackdrop = document.querySelector('#nav-menu > div:first-child');
if (navMenuBackdrop) {
    navMenuBackdrop.addEventListener('click', () => {
        if (closeMenuBtn) {
            closeMenuBtn.click();
        }
    });
}

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && !navMenu.classList.contains('hidden')) {
        if (closeMenuBtn) {
            closeMenuBtn.click();
        }
    }
});

// Scroll header effect with throttling for performance
let lastScroll = 0;
function handleScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const currentScroll = window.scrollY;
    if (currentScroll > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
}

// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Set initial header state
handleScroll();

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('header nav a, #nav-menu a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage || (currentPage === '' && linkPath === 'index.html')) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// Run on page load
setActiveNavLink();

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
    
    // Keyboard navigation for carousel
    indexCarousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            showIndexSlide(indexSlide - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            showIndexSlide(indexSlide + 1);
        }
    });
    
    // Make carousel focusable for keyboard navigation
    indexCarousel.setAttribute('tabindex', '0');
}
