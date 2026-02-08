import { $, $$ } from './utils.js';

export function initLightbox() {
    const lightbox = $('#lightbox');
    const lightboxImg = $('#lightbox-img');
    const closeBtn = $('.close-lightbox');
    const prevBtn = $('.prev');
    const nextBtn = $('.next');
    const photoGrid = $('.photo-grid');

    // Se não houver galeria, encerra
    if (!photoGrid) return;

    // Coletar imagens dinamicamente (para navegação)
    // Usamos um getter para garantir que se o DOM mudar, a lista atualiza
    const getGalleryImages = () => Array.from($$('.photo-item img'));
    let currentIndex = 0;

    // --- EVENT DELEGATION OPTIMIZATION ---
    // Instead of adding listeners to every single image, we add one to the grid container
    photoGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const allImages = getGalleryImages();
            currentIndex = allImages.indexOf(e.target);
            openLightbox(e.target.src);
        }
    });

    const openLightbox = (src) => {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    const showImage = (index) => {
        const allImages = getGalleryImages();
        if (index >= allImages.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = allImages.length - 1;
        } else {
            currentIndex = index;
        }
        lightboxImg.src = allImages[currentIndex].src;
    };

    // Event Listeners
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Navigation Buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(currentIndex + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(currentIndex - 1);
            });
        }

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showImage(currentIndex + 1);
                if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
            }
        });

        // Touch / Swipe
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) showImage(currentIndex + 1);
            if (touchEndX > touchStartX + 50) showImage(currentIndex - 1);
        }, { passive: true });
    }
}
