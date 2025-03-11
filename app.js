import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            spans: 0, // Initialement 0, sera mis à jour dans mounted()
            newColor: "#E8E9EB",
            isDarkMode: true,
            pageActive: "accueil"
        }
    },
    methods: {
        changerPage(page) {
            this.pageActive = page;
        },

        calculateSpans() {
            const spanWidth = Math.floor(window.innerWidth / 16); // Taille approximative d'un span
            const spanHeight = Math.floor(window.innerHeight / 16); // Taille approximative d'un span
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
    
}).mount('#app')