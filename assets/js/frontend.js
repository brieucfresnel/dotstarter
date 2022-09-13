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

import {eventsSlider} from "../../dotstarter/layouts/events-slider/events-slider";
import {aboutTopSlider, aboutCardsSlider} from "../../dotstarter/layouts/about-metronum/about-metronum";
import {partnersSlider} from "../../dotstarter/layouts/partners/partners";

import {singleEventsSlider} from "./templates/events-single";


var sliders = [eventsSlider, aboutTopSlider, aboutCardsSlider, partnersSlider, singleEventsSlider];

jQuery(($) => {
    const scripts = {
        once: () => {
            menu();
            scrollTop();

            sliders.forEach(slider => slider.init());

            layoutAnimations();
            loadLayoutScripts();

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