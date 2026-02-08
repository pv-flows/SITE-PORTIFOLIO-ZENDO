import { $ } from './utils.js';

export function initNavbar() {
    // Menu Mobile
    const hamburger = $('.hamburger');
    const navLinks = $('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isFlex = navLinks.style.display === 'flex';
            navLinks.style.display = isFlex ? 'none' : 'flex';

            if (!isFlex) {
                Object.assign(navLinks.style, {
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '70px',
                    left: '0',
                    width: '100%',
                    background: '#fdfbfb',
                    padding: '2rem',
                    borderBottom: '1px solid rgba(84, 110, 122, 0.15)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                });
            }
        });
    }

    // Scroll Suave e Fechamento do Menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = $(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Fecha menu mobile ao clicar
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }
        });
    });
}
