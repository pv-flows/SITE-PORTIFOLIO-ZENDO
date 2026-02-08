import { content } from '../data/content.js';

export function initLoader() {
    loadMeta();
    loadNavbar();
    loadHero();
    loadBio();
    loadSets();
    loadGallery();
    loadColab();
    loadFooter();
    console.log('Content loaded successfully');
}

function loadMeta() {
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]').content = content.meta.description;

    // OG Tags - assuming they exist, otherwise we could create them
    const sensitiveSet = (prop, val) => {
        const el = document.querySelector(`meta[property="${prop}"]`);
        if (el) el.content = val;
    };
    sensitiveSet('og:title', content.meta.og.title);
    sensitiveSet('og:description', content.meta.og.description);
    sensitiveSet('og:image', content.meta.og.image);
    sensitiveSet('og:url', content.meta.og.url);
}

function loadNavbar() {
    const navLogo = document.querySelector('.navbar .logo');
    if (navLogo) navLogo.textContent = content.navbar.logo;

    const navList = document.querySelector('.nav-links');
    if (navList) {
        navList.innerHTML = ''; // Clear existing
        content.navbar.links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            if (link.class) a.className = link.class;
            li.appendChild(a);
            navList.appendChild(li);
        });
    }
}

function loadHero() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // We can either target specific children or rebuild. Rebuilding is safer for "agnostic" structure if we want to change layout order
        // But to keep CSS working, we should probably target specific elements or recreate the exact structure.
        // Let's assume the HTML container exists.

        // Title
        // For title, we have HTML inside (br, span). content.hero.title contains HTML.
        const h1 = heroContent.querySelector('h1');
        if (h1) h1.innerHTML = content.hero.title;

        const p = heroContent.querySelector('p');
        if (p) p.textContent = content.hero.subtitle;

        const btn = heroContent.querySelector('.btn-primary');
        if (btn) {
            btn.href = content.hero.cta.href;
            btn.textContent = content.hero.cta.text;
        }
    }
}

function loadBio() {
    const bioTextContainer = document.querySelector('.bio-text');
    if (bioTextContainer) {
        const h2 = bioTextContainer.querySelector('h2');
        if (h2) h2.textContent = content.bio.title;

        // Remove existing paragraphs to avoid duplication if running multiple times, or just clear and rebuild
        // Saving h2 first
        const title = h2 ? h2.outerHTML : '';
        bioTextContainer.innerHTML = title; // clear everything except title if we saved it, or just append after clearing.

        // Re-adding title if it was lost or just append paragraphs
        // Actually simpler: clear all, add h2, then add paragraphs
        bioTextContainer.innerHTML = '';
        if (h2) bioTextContainer.appendChild(h2);

        content.bio.paragraphs.forEach(text => {
            const p = document.createElement('p');
            p.innerHTML = text; // using innerHTML specifically for <strong> and <em> tags
            bioTextContainer.appendChild(p);
        });
    }

    const bioStats = document.querySelector('.bio-stats');
    if (bioStats) {
        bioStats.innerHTML = '';
        content.bio.stats.forEach(stat => {
            const div = document.createElement('div');
            div.className = 'stat-box';
            div.innerHTML = `<h3>${stat.title}</h3><p>${stat.text}</p>`;
            bioStats.appendChild(div);
        });
    }
}

function loadSets() {
    const setsSection = document.getElementById('sets');
    if (!setsSection) return;

    const h2 = setsSection.querySelector('h2');
    if (h2) h2.textContent = content.sets.title;

    // Spotify (formerly Soundcloud container)
    const scContainer = setsSection.querySelector('.soundcloud-container');
    if (scContainer && content.sets.soundcloud) {
        // If it's marked as Spotify, we use a different iframe structure or just inject the src
        if (content.sets.soundcloud.isSpotify) {
            scContainer.innerHTML = `
                <iframe style="border-radius:12px" src="${content.sets.soundcloud.iframeSrc}" 
                width="100%" height="352" frameBorder="0" 
                allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"></iframe>
            `;
            // Hide footer if it exists or clear styles associated with SC footer
        } else {
            scContainer.innerHTML = `
                <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay"
                    src="${content.sets.soundcloud.iframeSrc}"></iframe>
                <div class="soundcloud-footer">
                    <a href="${content.sets.soundcloud.artistLink}" title="${content.sets.soundcloud.artistName}" target="_blank">${content.sets.soundcloud.artistName}</a> · 
                    <a href="${content.sets.soundcloud.trackLink}" title="${content.sets.soundcloud.trackName}" target="_blank">${content.sets.soundcloud.trackName}</a>
                </div>
            `;
        }
    }

    // Mixcloud - Clear or Hide if not used in new content structure
    const mcContainer = setsSection.querySelector('.mixcloud-container');
    if (mcContainer) {
        if (content.sets.mixcloud) {
            mcContainer.innerHTML = `
                 <iframe width="100%" height="120"
                    src="${content.sets.mixcloud.iframeSrc}" frameborder="0"
                    allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;"></iframe>
            `;
        } else {
            mcContainer.style.display = 'none';
        }
    }

    // Deezer (using mixcloud container for layout recyclable)
    const deezerContainer = setsSection.querySelector('.mixcloud-container');
    if (deezerContainer) {
        if (content.sets.deezer) {
            deezerContainer.style.display = 'block';
            deezerContainer.innerHTML = `
                 <iframe title="deezer-widget" src="${content.sets.deezer.iframeSrc}" width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
            `;
        } else {
            deezerContainer.style.display = 'none';
        }
    }

    // YouTube - Handle Array
    const ytContainer = setsSection.querySelector('.youtube-container');
    if (ytContainer && content.sets.youtube) {
        ytContainer.innerHTML = ''; // Clear existing
        const videos = Array.isArray(content.sets.youtube) ? content.sets.youtube : [content.sets.youtube];

        // Create a grid for videos if there are multiple
        if (videos.length > 1) {
            ytContainer.style.display = 'grid';
            // Force 2 columns as requested for the 2x2 grid layout
            ytContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
            ytContainer.style.gap = '1.5rem';
        }

        videos.forEach(video => {
            const wrapper = document.createElement('div');
            wrapper.style.aspectRatio = '16/9';
            wrapper.style.width = '100%';

            wrapper.innerHTML = `
                 <iframe width="100%" height="100%" src="${video.iframeSrc}" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            `;
            ytContainer.appendChild(wrapper);
        });
    }
}

function loadGallery() {
    const galleryGrid = document.querySelector('.photo-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        content.gallery.images.forEach(img => {
            const div = document.createElement('div');
            div.className = 'photo-item';
            div.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            galleryGrid.appendChild(div);
        });
    }

    const h2 = document.querySelector('#galeria h2');
    if (h2) h2.textContent = content.gallery.title;
}

function loadColab() {
    const colabSection = document.getElementById('colab');
    if (colabSection) {
        const h3 = colabSection.querySelector('h3');
        if (h3) h3.textContent = content.colab.title;
        const p = colabSection.querySelector('p');
        if (p) p.textContent = content.colab.text;
    }
}

function loadFooter() {
    const footerCtx = document.querySelector('.footer-content');
    if (!footerCtx) return;

    const h2 = footerCtx.querySelector('h2');
    if (h2) h2.textContent = content.footer.title;

    const p = footerCtx.querySelector('p:not(.copyright)'); // Select first p
    if (p) p.textContent = content.footer.subtitle;

    const btn = footerCtx.querySelector('.btn-primary');
    if (btn) {
        btn.href = content.footer.cta.href;
        btn.textContent = content.footer.cta.text;
    }

    const socials = footerCtx.querySelector('.socials');
    if (socials) {
        socials.innerHTML = '';
        content.footer.socials.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            if (link.href !== '#') a.target = "_blank";
            socials.appendChild(a);
        });
    }

    const copy = footerCtx.querySelector('.copyright');
    if (copy) copy.innerHTML = content.footer.copyright;
}
