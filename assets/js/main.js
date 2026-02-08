import { initNavbar } from './modules/navbar.js';
import { initLightbox } from './modules/lightbox.js';
import { initLoader } from './modules/loader.js';

document.addEventListener('DOMContentLoaded', () => {
    initLoader(); // Load content first
    initNavbar();
    initLightbox();
    console.log('App initialized module-wise');
});
