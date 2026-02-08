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

        // Check for CD Player or CTA button
        const btn = heroContent.querySelector('.btn-primary');

        if (content.hero.playerDisco) {
            // Remove existing button if present
            if (btn) btn.remove();

            // Check if player already exists
            let playerContainer = heroContent.querySelector('.player-disco-container');
            if (!playerContainer) {
                playerContainer = document.createElement('div');
                playerContainer.className = 'player-disco-container';

                // Disco de CD prata simples
                const disco = document.createElement('div');
                disco.className = 'disco-prata';
                disco.setAttribute('role', 'button');
                disco.setAttribute('aria-label', 'Clique para rolar até o Spotify');
                disco.setAttribute('tabindex', '0');

                // Camada do efeito prisma
                const efeitoPrisma = document.createElement('div');
                efeitoPrisma.className = 'efeito-prisma';
                disco.appendChild(efeitoPrisma);

                // SVG com texto curvo FORA do CD
                if (content.hero.playerDisco.label) {
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('class', 'texto-curvo-cd');
                    svg.setAttribute('viewBox', '0 0 280 280');

                    // Define o path circular (raio maior para ficar fora do disco)
                    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('id', 'circulo-texto');
                    // Path circular com raio 130 (disco tem raio 120)
                    path.setAttribute('d', 'M 140,10 A 130,130 0 1,1 139.99,10');
                    defs.appendChild(path);
                    svg.appendChild(defs);

                    // Texto que segue o path
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
                    textPath.setAttribute('href', '#circulo-texto');
                    textPath.setAttribute('startOffset', '75%'); // 270 graus = 75% do círculo
                    textPath.setAttribute('text-anchor', 'middle');
                    textPath.textContent = content.hero.playerDisco.label.toUpperCase();
                    text.appendChild(textPath);
                    svg.appendChild(text);

                    playerContainer.appendChild(svg);
                }

                playerContainer.appendChild(disco);

                if (content.hero.playerDisco.label) {
                    const label = document.createElement('span');
                    label.className = 'player-disco-label';
                    label.textContent = content.hero.playerDisco.label;
                    playerContainer.appendChild(label);
                }

                heroContent.appendChild(playerContainer);
            }
        } else if (btn && content.hero.cta) {
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

    // Achievements & Discography
    if (content.sets.achievements) {
        let achievementsContainer = setsSection.querySelector('#conquistas');
        if (!achievementsContainer) {
            achievementsContainer = document.createElement('div');
            achievementsContainer.id = 'conquistas';
            achievementsContainer.className = 'achievements-container';
            // Insert after title
            if (h2) h2.after(achievementsContainer);
            else setsSection.prepend(achievementsContainer);
        }

        achievementsContainer.innerHTML = '';

        const createSection = (data) => {
            const section = document.createElement('div');
            section.className = 'achievement-section';
            section.innerHTML = `<h3>${data.title}</h3>`;

            const list = document.createElement('div');
            list.className = 'achievement-list';

            data.items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'achievement-item';
                if (item.type) {
                    // Add variant class for random scribble effect
                    const variant = (index % 3) + 1;
                    itemDiv.innerHTML = `<h4><span class="highlight variant-${variant}">${item.title}</span> <small>(${item.type})</small></h4><p>${item.text}</p>`;
                } else {
                    itemDiv.innerHTML = `<h4>${item.subtitle}</h4><p>${item.text}</p>`;
                }
                list.appendChild(itemDiv);
            });
            section.appendChild(list);
            return section;
        };

        if (content.sets.achievements.awards) {
            achievementsContainer.appendChild(createSection(content.sets.achievements.awards));
        }
        if (content.sets.achievements.discography) {
            achievementsContainer.appendChild(createSection(content.sets.achievements.discography));
        }
    }

    // Spotify (formerly Soundcloud container)
    const scContainer = setsSection.querySelector('.soundcloud-container');
    if (scContainer && content.sets.soundcloud) {
        // Add ID for navigation
        scContainer.id = 'spotify';

        let html = '';
        if (content.sets.soundcloud.sectionTitle) {
            html += `<h3>${content.sets.soundcloud.sectionTitle}</h3>`;
        }
        if (content.sets.soundcloud.description) {
            html += `<p>${content.sets.soundcloud.description}</p>`;
        }

        if (content.sets.soundcloud.isSpotify) {
            html += `
                <iframe style="border-radius:12px" src="${content.sets.soundcloud.iframeSrc}" 
                width="100%" height="352" frameBorder="0" 
                allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"></iframe>
            `;
        } else {
            html += `
                <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay"
                    src="${content.sets.soundcloud.iframeSrc}"></iframe>
                <div class="soundcloud-footer">
                    <a href="${content.sets.soundcloud.artistLink}" title="${content.sets.soundcloud.artistName}" target="_blank">${content.sets.soundcloud.artistName}</a> · 
                    <a href="${content.sets.soundcloud.trackLink}" title="${content.sets.soundcloud.trackName}" target="_blank">${content.sets.soundcloud.trackName}</a>
                </div>
            `;
        }
        scContainer.innerHTML = html;
    }

    // Mixcloud / Deezer Containers - Clear/Hide
    const mcContainer = setsSection.querySelector('.mixcloud-container');
    if (mcContainer) mcContainer.style.display = 'none';

    // Youtube
    const ytContainer = setsSection.querySelector('.youtube-container');
    if (ytContainer && content.sets.youtube) {
        ytContainer.innerHTML = ''; // Clear existing

        // Handle new structure (object) vs old (array) for backward compatibility if needed, but we updated content.js
        const youtubeData = content.sets.youtube;
        const videos = youtubeData.videos || [];

        // Title and Description for YouTube
        if (youtubeData.sectionTitle) {
            const h3 = document.createElement('h3');
            h3.textContent = youtubeData.sectionTitle;
            ytContainer.appendChild(h3);
        }
        if (youtubeData.description) {
            const p = document.createElement('p');
            p.textContent = youtubeData.description;
            ytContainer.appendChild(p);
        }

        // Wrapper for grid to keep titles separate from grid layout if we want, 
        // OR we apply grid to a sub-container. 
        // Current CSS might apply grid to .youtube-container directly.
        // If .youtube-container is grid, titles will be grid items.
        // Let's create a videos div to hold the grid items to be safe/cleaner

        const videoGrid = document.createElement('div');
        // Class will be assigned based on count

        if (videos.length > 1) {
            // Grid layout handled in CSS via .video-grid class
            videoGrid.className = 'video-grid';
        } else {
            videoGrid.className = 'single-video';
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
            videoGrid.appendChild(wrapper);
        });
        ytContainer.appendChild(videoGrid);

        if (content.sets.channelUrl) {
            const btnWrapper = document.createElement('div');
            btnWrapper.style.textAlign = 'center';
            btnWrapper.style.marginTop = '2rem';
            if (videos.length > 1) {
                btnWrapper.style.gridColumn = '1 / -1';
            }

            const btn = document.createElement('a');
            btn.href = content.sets.channelUrl;
            btn.target = '_blank';
            btn.className = 'btn-primary';
            btn.textContent = 'Ver canal completo';

            btnWrapper.appendChild(btn);
            ytContainer.appendChild(btnWrapper);
        }
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
