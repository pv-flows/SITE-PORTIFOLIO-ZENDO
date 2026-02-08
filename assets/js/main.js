import { initNavbar } from './modules/navbar.js';
import { initLightbox } from './modules/lightbox.js';
import { initLoader } from './modules/loader.js';
import { initPlayerDisco } from './modules/playerDisco.js';

document.addEventListener('DOMContentLoaded', () => {
    initLoader(); // Load content first
    initNavbar();
    initLightbox();
    initPlayerDisco(); // Initialize CD Player
    console.log('App initialized module-wise');
});
