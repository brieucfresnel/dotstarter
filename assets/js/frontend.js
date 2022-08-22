// Lib
import barba from "./lib/barba";
import loadGsap from "./lib/gsap-loader";
import ScrollTrigger from "gsap/ScrollTrigger";

// Components
import menu from "./components/menu";
import scrollTop from "./components/scrolltop";

// Animations
import layoutAnimations from "./animations/layout";
import loadLayoutScripts from "./layouts";

// Templates


var sliders = [];

jQuery(($) => {
    const scripts = {
        once: () => {
            menu();
            scrollTop();
            layoutAnimations();

            sliders.forEach(slider => slider.init());

            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500)
        },
        load: () => {
            menu();
            scrollTop();

            sliders.forEach(slider => slider.init())

            layoutAnimations();
            loadLayoutScripts();

            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500)
        }
    }

    $(document).ready(() => {
        // Slick Sliders
        loadGsap();

        if (ajaxConfig.barbaActive) {
            barba(scripts);
            return;
        }

        scripts.load();
    })
})