/**
 * ====================================================================
 * SCRIPT.JS - LANDING PAGE ARTÍSTICA
 * Conceito: Interações orgânicas, sutis e performáticas.
 * Foco: "Visual Silence" & Acessibilidade.
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Estado global de preferências de movimento (Acessibilidade)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * INICIALIZAÇÃO GERAL
     * Centraliza a chamada de todas as funcionalidades.
     */
    const init = () => {
        initScrollReveal();
        initParallaxHero();
        initButtonInteractions();
        initHeaderReaction();
        initSmoothAnchorScroll();
    };

    /**
     * 1. SCROLL REVEAL (Intersection Observer)
     * Revela elementos suavemente quando entram na viewport.
     * Adiciona a classe '.is-visible' para transições CSS.
     */
    const initScrollReveal = () => {
        // Elementos a serem observados
        const targets = document.querySelectorAll('.section, .card, .about-text, .hero-title, .video-placeholder');

        if (targets.length === 0) return;

        const observerOptions = {
            root: null, // viewport
            threshold: 0.1, // aciona quando 10% do elemento está visível
            rootMargin: '0px 0px -50px 0px' // offset para acionar um pouco antes do fim
        };

        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona classe para disparar CSS
                    entry.target.classList.add('is-visible');
                    // Para de observar após revelar (performance)
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(revealCallback, observerOptions);

        targets.forEach(target => {
            // Estado inicial para CSS (pode ser definido no CSS, mas reforçamos aqui)
            target.style.willChange = 'opacity, transform';
            observer.observe(target);
        });
    };

    /**
     * 2. HERO PARALLAX SUTIL
     * Cria uma profundidade quase imperceptível no scroll.
     * Desativado se o usuário prefere redução de movimento.
     */
    const initParallaxHero = () => {
        if (prefersReducedMotion) return;

        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');

        if (!hero || !heroContent) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const limit = hero.offsetHeight;

                    // Só calcula se o hero ainda estiver visível
                    if (scrolled <= limit) {
                        // Movimento muito lento (0.08) para sensação psicológica
                        const yPos = scrolled * 0.08;
                        const opacity = 1 - (scrolled / limit); // Fade out suave

                        heroContent.style.transform = `translateY(${yPos}px)`;
                        heroContent.style.opacity = opacity;
                    }

                    ticking = false;
                });

                ticking = true;
            }
        }, { passive: true });
    };

    /**
     * 3. INTERAÇÃO TÁTIL NOS BOTÕES
     * Feedback visual instantâneo para cliques e toques.
     */
    const initButtonInteractions = () => {
        const buttons = document.querySelectorAll('.btn, .video-placeholder');

        buttons.forEach(btn => {
            // Mouse Down / Touch Start
            const activate = () => btn.classList.add('active');

            // Mouse Up / Leave / Touch End
            const deactivate = () => {
                // Pequeno delay para garantir que a animação seja percebida
                setTimeout(() => btn.classList.remove('active'), 150);
            };

            btn.addEventListener('mousedown', activate);
            btn.addEventListener('touchstart', activate, { passive: true });

            btn.addEventListener('mouseup', deactivate);
            btn.addEventListener('mouseleave', deactivate);
            btn.addEventListener('touchend', deactivate);

            // Acessibilidade via Teclado
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    activate();
                }
            });
            btn.addEventListener('keyup', deactivate);
        });
    };

    /**
     * 4. HEADER REATIVO
     * Muda o estado da navegação baseada no scroll.
     * Útil se houver uma barra de navegação fixa.
     */
    const initHeaderReaction = () => {
        const header = document.querySelector('header') || document.querySelector('.site-header');
        const triggerPoint = 50; // px
        let isScrolled = false;

        if (!header) return;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > triggerPoint && !isScrolled) {
                header.classList.add('scrolled');
                isScrolled = true;
            } else if (currentScroll <= triggerPoint && isScrolled) {
                header.classList.remove('scrolled');
                isScrolled = false;
            }
        }, { passive: true });
    };

    /**
     * 5. SMOOTH SCROLL PARA ANCORAS INTERNAS
     * Garante fluidez na navegação interna, mesmo em browsers antigos.
     */
    const initSmoothAnchorScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Inicializa o script
    init();
});