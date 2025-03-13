import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let swiper; // Déclaration globale de Swiper

createApp({
    data() {
        return {
            spans: 0, // Initialement 0, sera mis à jour dans mounted()
            newColor: "#E8E9EB",
            isDarkMode: true,
            pageActive: "accueil",
            hoverColor: "#F29D35", // Couleur orange pour le survol
            currentSlide: 0, // Index du slide actif
            transitionName: "slide-left",
            pages: ["accueil", "projets", "contact"],
            description: [
                "Le projet Comics Blast est le projet de fin d'année de ma formation en concéption de site web et créer en équipe de trois.",
                "Petit lecteur de musique fait en vuejs et tailwind.",
                "AI Chat est un projet Permettant de créer plusieurs conversations avec une IA qui envoie la bonne réponse basé sur les mots utilisé.",
                "Application affichant la météo par rapport a la ville et le pays rentré dans les champs de recherche. Utilise Open Weather Map API.",
                "Petite Base de donnnée affichant queques films."
            ],
            competences: [
                "Laravel / Tailwind / Scss",
                "VueJs / Tailwind",
                "Larael / Tailwind / VueJs",
                "VueJs / Tailwind",
                "VueJs / Tailwind"
            ],
            githubLinks: [
                "https://github.com/Skyylios/pw2_comics_blast",
                "https://github.com/Skyylios/Lecteur-de-musique",
                "https://github.com/Skyylios/Projet-IA-Chat",
                "#",
                "#"
            ],
            github: [
                "Github Comics Blast",
                "Github Lecteur de musique",
                "Github Projet IA Chat",
                "Bientot disponible",
                "Bientot disponible"
            ],
            liensEnLigne: [
                "https://projet-web2-e1.cpsw-fcsei.com/",
                "https://skyylios.github.io/Lecteur-de-musique/",
                "#",
                "#",
                "#"
            ],
            enLigne: [
                "Site Comics Blast",
                "Site Lecteur de musique",
                "Pas en ligne",
                "Bientot disponible",
                "Bientot disponible"
            ],
        };
    },
    methods: {
        changerPage(page) {
            if (this.pageActive === "accueil" && page === "projets") {
                this.transitionName = "slide-left";
            } else if (this.pageActive === "accueil" && page === "contact") {
                this.transitionName = "slide-left";
            }else if (this.pageActive === "projets" && page === "accueil") {
                this.transitionName = "slide-right";
            } else if (this.pageActive === "projets" && page === "contact") {
                this.transitionName = "slide-left";
            } else if (this.pageActive === "contact" && page === "projets") {
                this.transitionName = "slide-right";
            }else if (this.pageActive === "contact" && page === "accueil") {
                this.transitionName = "slide-right";
            }
            this.pageActive = page;
        },

        pageSuivante() {
            const currentIndex = this.pages.indexOf(this.pageActive);
            const nextIndex = (currentIndex + 1) % this.pages.length; // Boucle infinie
            this.changerPage(this.pages[nextIndex]);
          },

          pagePrecedente() {
            const currentIndex = this.pages.indexOf(this.pageActive);
            const prevIndex = (currentIndex - 1 + this.pages.length) % this.pages.length;
            this.changerPage(this.pages[prevIndex]);
          },

        calculateSpans() {
            const spanWidth = Math.floor(window.innerWidth / 16);
            const spanHeight = Math.floor(window.innerHeight / 16);
            const numSpans = Math.ceil((window.innerWidth * window.innerHeight) / (spanWidth * spanHeight));
            this.spans = numSpans;
        },

        changerTheme() {
            this.isDarkMode = !this.isDarkMode;
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark');
                this.newColor = "#E8E9EB";
            } else {
                document.documentElement.classList.remove('dark');
                this.newColor = "#1E3040";
            }
            this.updateSvgColors();
        },

        updateSvgColors() {
            document.querySelectorAll("svg").forEach(svg => {
                svg.setAttribute("fill", this.newColor);
                svg.style.fill = this.newColor;

                svg.querySelectorAll("g").forEach(g => {
                    g.setAttribute("fill", this.newColor);
                    g.style.fill = this.newColor;
                });
            });
        },

        handleMouseEnter(event) {
            const svg = event.currentTarget;
            svg.setAttribute("fill", this.hoverColor);
            svg.style.fill = this.hoverColor;

            svg.querySelectorAll("g").forEach(g => {
                g.setAttribute("fill", this.hoverColor);
                g.style.fill = this.hoverColor;
            });
        },

        handleMouseLeave(event) {
            const svg = event.currentTarget;
            svg.setAttribute("fill", this.newColor);
            svg.style.fill = this.newColor;

            svg.querySelectorAll("g").forEach(g => {
                g.setAttribute("fill", this.newColor);
                g.style.fill = this.newColor;
            });
        },

        initSwiper() {
            setTimeout(() => {
                if (document.querySelector(".mySwiper")) {
                    if (!swiper) {
                        swiper = new Swiper(".mySwiper", {
                            effect: "cards",
                            grabCursor: true,
                            initialSlide: 0,
                            speed: 500,
                            rotate: true,
                            mousewheel: {
                                invert: false,
                            },
                            on: {
                                slideChange: () => {
                                    this.currentSlide = swiper.realIndex; // Met à jour `currentSlide`
                                    console.log("Slide actif : ", this.currentSlide);
                                }
                            }
                        });
                    } else {
                        swiper.update();
                    }
                }
            }, 100);
        }
    },

    watch: {
        pageActive(newVal) {
            if (newVal === "projets") {
                this.initSwiper();
            }
        }
    },

    mounted() {
        this.calculateSpans();
        window.addEventListener('resize', this.calculateSpans);

        // Activer le thème sombre par défaut
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        }

        this.updateSvgColors();
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.calculateSpans);
    }

}).mount('#app');

