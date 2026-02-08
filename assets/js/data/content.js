export const content = {
    meta: {
        title: "ZENDO | Cantor e Compositor",
        description: "Portfólio oficial de Zendo. Artista de Recife que mistura Pop, Hip-hop, R&B e Brega com sensualidade e sensibilidade. Confira o EP Âmago e o hit Sagaz.",
        keywords: "Zendo, Cantor, Compositor, Recife, Pop, Hip-Hop, R&B, Brega, Música Brasileira",
        author: "Zendo",
        og: {
            title: "ZENDO | Cantor e Compositor",
            description: "O novo som de Recife. Sensualidade e sensibilidade.",
            image: "assets/img/hero-bg.jpg",
            url: "https://zendo.official",
            type: "website"
        }
    },
    navbar: {
        logo: "ZENDO",
        links: [
            { href: "#home", text: "Início" },
            { href: "#sobre", text: "O Artista" },
            { href: "#sets", text: "Destaques" },
            { href: "#galeria", text: "Clipes" },
            { href: "#contato", text: "Contato", class: "btn-nav" }
        ]
    },
    hero: {
        title: "ZENDO",
        subtitle: "O novo som de Recife. Sensualidade e sensibilidade.",
        cta: { href: "#sets", text: "Ouvir Agora" }
    },
    bio: {
        title: "O Artista",
        paragraphs: [
            "<strong>Zendo</strong> é um cantor e compositor independente brasileiro, natural de <strong>Recife, Pernambuco</strong>.",
            "Ganhando destaque na cena contemporânea, ele mistura o calor do Nordeste com batidas globais. Suas composições são marcadas por uma combinação única de <strong>sensualidade e sensibilidade</strong>, criando uma atmosfera que envolve e provoca.",
            "Do caos urbano ao intimismo, Zendo traduz sentimentos complexos em melodias viciantes."
        ],
        stats: [
            { title: "Vibe", text: "Sensual, Envolvente, Urbano" },
            { title: "Gêneros", text: "Pop, Hip-Hop, R&B, Brega" }
        ]
    },
    sets: {
        title: "Conquistas & Obras",
        soundcloud: {
            iframeSrc: "https://open.spotify.com/embed/artist/0Skk053T4ToK44sw09CPlI?utm_source=generator", // Using Soundcloud container for Spotify as requested
            isSpotify: true // Flag to handle iframe differently if needed
        },
        deezer: {
            iframeSrc: "https://widget.deezer.com/widget/dark/artist/201690427/top_tracks"
        },
        youtube: [
            { iframeSrc: "https://www.youtube.com/embed/f73db7r3Xf8" },
            { iframeSrc: "https://www.youtube.com/embed/F_Mi6IL41hY" },
            { iframeSrc: "https://www.youtube.com/embed/NKzp2ryFkpg" },
            { iframeSrc: "https://www.youtube.com/embed/yCGLpymTjh4" }
        ]
    },
    gallery: {
        title: "Clipes & Visuais",
        images: [
            { src: "assets/img/foto1.jpg", alt: "Zendo - Clipe Sagaz" },
            { src: "assets/img/foto2.jpg", alt: "Zendo - Visualizer Âmago" },
            { src: "assets/img/foto3.jpg", alt: "Zendo - Performance Live" },
            { src: "assets/img/foto4.heic", alt: "Zendo - Estúdio" },
            { src: "assets/img/foto5.jpeg", alt: "Zendo - Bastidores" },
            { src: "assets/img/foto6.jpg", alt: "Zendo - Ensaio Fotográfico" },
            { src: "assets/img/foto7.jpeg", alt: "Zendo - Show ao Vivo" },
            { src: "assets/img/foto8.jpeg", alt: "Zendo - Promoção" },
            { src: "assets/img/foto9.jpeg", alt: "Zendo - Identidade Visual" },
            { src: "assets/img/foto10.jpg", alt: "Zendo - Galeria" },
            { src: "assets/img/foto11.heic", alt: "Zendo - Galeria" },
            { src: "assets/img/foto12.heic", alt: "Zendo - Galeria" },
            { src: "assets/img/foto13.jpg", alt: "Zendo - Galeria" },
            { src: "assets/img/foto14.jpeg", alt: "Zendo - Galeria" },
            { src: "assets/img/foto15.jpeg", alt: "Zendo - Galeria" },
            { src: "assets/img/foto16.heic", alt: "Zendo - Galeria" },
            { src: "assets/img/foto17.heic", alt: "Zendo - Galeria" },
            { src: "assets/img/foto18.heic", alt: "Zendo - Galeria" }
        ]
    },
    colab: {
        title: "Parcerias de Peso",
        text: "Zendo colabora com grandes nomes da cena pernambucana, como Doralyce no feat 'Não Dá Mais', expandindo os horizontes da música urbana."
    },
    footer: {
        title: "Contato & Shows",
        subtitle: "Disponível para parcerias, shows e projetos audiovisuais.",
        cta: { href: "mailto:euzendo@gmail.com", text: "euzendo@gmail.com" },
        socials: [
            { href: "https://www.instagram.com/euzendo", text: "Instagram" },
            { href: "https://open.spotify.com/artist/zendo", text: "Spotify" },
            { href: "https://music.apple.com/br/artist/zendo/1610230413", text: "Apple Music" },
            { href: "https://www.youtube.com/@zendo", text: "YouTube" }
        ],
        copyright: "&copy; 2024 Zendo. Todos os direitos reservados."
    }
};

