document.addEventListener('DOMContentLoaded', () => {

    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10,10,10,0.95)';
            navLinks.style.padding = '2rem';
        }
    });

    // Scroll Suave para links internos (caso navegadores antigos)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Fecha menu mobile ao clicar
            // Fecha menu mobile ao clicar
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // Pegar todas as imagens da grade, exceto se houver alguma que não queiramos (aqui pegamos todas dentro de .photo-item)
    const galleryImages = document.querySelectorAll('.photo-item img');
    let currentIndex = 0;

    // Abrir Lightbox
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            currentIndex = index;
            document.body.style.overflow = 'hidden'; // Bloquear rolagem do fundo
        });
        // Adicionar cursor pointer nas imagens
        img.style.cursor = 'pointer';
    });

    // Fechar Lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Liberar rolagem
    }

    closeBtn.addEventListener('click', closeLightbox);

    // Fechar ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegação
    function showImage(index) {
        if (index >= galleryImages.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = galleryImages.length - 1;
        } else {
            currentIndex = index;
        }
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    // Teclado
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
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe Left -> Next Image
            showImage(currentIndex + 1);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe Right -> Prev Image
            showImage(currentIndex - 1);
        }
    }
});