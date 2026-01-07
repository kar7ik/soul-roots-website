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
    // Get current URL and pathname
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || '';
    
    // Normalize path - handle root, index.html, and other pages
    function normalizePath(path) {
        if (!path) return '';
        // Remove leading/trailing slashes
        path = path.replace(/^\/+|\/+$/g, '');
        // Handle empty path or root as index.html
        if (!path || path === '' || path === 'index' || path === 'index.html') {
            return 'index.html';
        }
        // Remove .html extension for comparison (Netlify might serve without it)
        path = path.replace(/\.html$/, '');
        // Add .html back for consistent matching
        return path + '.html';
    }
    
    // Get filename from current path
    let currentFileName = currentPage;
    if (!currentFileName || currentFileName === '' || currentPath === '/' || currentPath.endsWith('/')) {
        // We're on root/homepage
        currentFileName = 'index.html';
    } else {
        // Remove .html if present, then add it back for consistency
        currentFileName = currentFileName.replace(/\.html$/, '') + '.html';
    }
    
    document.querySelectorAll('header nav a, #nav-menu a').forEach(link => {
        const linkPath = link.getAttribute('href');
        const normalizedLink = normalizePath(linkPath);
        
        // Remove any existing aria-current
        link.removeAttribute('aria-current');
        
        // Method 1: Compare normalized paths
        let isActive = normalizedLink === currentFileName;
        
        // Method 2: Fallback - check if link's resolved URL matches current URL
        if (!isActive && linkPath) {
            try {
                const linkUrl = new URL(linkPath, window.location.origin);
                const currentUrlObj = new URL(currentUrl);
                // Compare pathnames (ignore hash and search)
                if (linkUrl.pathname === currentUrlObj.pathname || 
                    (linkUrl.pathname === '/' && currentUrlObj.pathname === '/') ||
                    (linkUrl.pathname.endsWith('/index.html') && currentUrlObj.pathname === '/') ||
                    (linkUrl.pathname === '/' && currentUrlObj.pathname.endsWith('/index.html'))) {
                    isActive = true;
                }
            } catch (e) {
                // If URL parsing fails, fall back to simple string comparison
                const resolvedPath = new URL(linkPath, window.location.origin).pathname;
                if (resolvedPath === currentPath || 
                    (resolvedPath === '/index.html' && currentPath === '/')) {
                    isActive = true;
                }
            }
        }
        
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Run on page load and when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveNavLink);
} else {
    setActiveNavLink();
}

// Also run after a short delay to ensure DOM is fully ready
setTimeout(setActiveNavLink, 100);

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

function showIndexSlide(i) {
    if (!indexCarousel) return;
    
    const total = indexCarousel.children.length;
    if (i < 0) indexSlide = total - slideCount;
    else if (i > total - slideCount) indexSlide = 0;
    else indexSlide = i;

    const percent = (indexSlide * (100 / slideCount));
    indexCarousel.style.transform = `translateX(-${percent}%)`;
}

// Initialize carousel
if (indexCarousel) {
    updateSlideCount();
    // Set initial position to show first slide(s) properly
    showIndexSlide(0);
    
    window.addEventListener('resize', () => {
        updateSlideCount();
        showIndexSlide(indexSlide); // update transform
    });
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
