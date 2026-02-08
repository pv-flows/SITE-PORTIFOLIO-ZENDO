export function initPlayerDisco() {
    const disco = document.querySelector('.disco-prata');
    const playerContainer = document.querySelector('.player-disco-container');

    if (!disco || !playerContainer) return;

    let isAnimating = false;

    disco.addEventListener('click', () => {
        // Evita cliques durante animação
        if (isAnimating || playerContainer.classList.contains('recolhido')) return;

        isAnimating = true;

        // Ativa o estado "tocando"
        disco.classList.add('tocando');
        playerContainer.classList.add('tocando');

        // Scroll suave até o Spotify
        const spotifySection = document.getElementById('spotify');
        if (spotifySection) {
            spotifySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Após 3s: para de girar e recolhe
        setTimeout(() => {
            disco.classList.remove('tocando');

            setTimeout(() => {
                playerContainer.classList.add('recolhido');
                isAnimating = false;
            }, 500);
        }, 3000);
    });

    // Teclado (acessibilidade)
    disco.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            disco.click();
        }
    });

    // INICIO no menu - ejeta o CD
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href="#home"]');
        if (link && playerContainer.classList.contains('recolhido')) {
            e.preventDefault();

            playerContainer.classList.remove('recolhido', 'tocando');
            playerContainer.classList.add('ejetando');

            const heroSection = document.getElementById('home');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Reset após ejeção
            setTimeout(() => {
                playerContainer.classList.remove('ejetando');
            }, 1500);
        }
    });
}
