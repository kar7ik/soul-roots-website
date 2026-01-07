// gallery.js

// Lightbox logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

// Get all gallery images
const galleryImages = Array.from(document.querySelectorAll('.gallery-item'));
let currentImageIndex = 0;

// Function to open lightbox with specific image
function openLightbox(index) {
    if (index < 0 || index >= galleryImages.length) return;
    
    currentImageIndex = index;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    
    // Update button visibility
    prevBtn.style.display = galleryImages.length > 1 ? 'block' : 'none';
    nextBtn.style.display = galleryImages.length > 1 ? 'block' : 'none';
}

// Function to show previous image
function showPreviousImage() {
    const newIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    openLightbox(newIndex);
}

// Function to show next image
function showNextImage() {
    const newIndex = currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1;
    openLightbox(newIndex);
}

// Add click handlers to gallery images
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Close lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
});

// Close lightbox when clicking backdrop
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }
});

// Navigation buttons
if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPreviousImage();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPreviousImage();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNextImage();
    } else if (e.key === 'Escape') {
        e.preventDefault();
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }
});
