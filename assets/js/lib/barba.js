import barba from '@barba/core';
import {
    pageTransitionExiting,
    pageTransitionOpening
} from '../animations/loader';
// import BigImageSlider from "../../../dotstarter/layouts/big-image-slider/big-image-slider";

window.barba = barba;

/**
 * Commands to run after loading a new page
 * @barba-hook after
 */
const initComponents = () => {
    // BigImageSlider.init();
}

/**
 * If the next page URL contains one of these strings, prevent page transition
 *
 * @type {string[]}
 */
const urlPartsToBlock = [
    'wp-admin',
    'panier',
    'cart',
    'paiement',
    'checkout',
    'boutique',
    'shop',
    'produit',
    'product'
];

/**
 * If the next page URL contains one of these strings, prevent page change
 *
 * @type {string[]}
 */
const urlPartsToPreventPageChange = [
    '?remove_item',
    '?undo_item',
];

export default async function (scripts) {

    // Init
    barba.init({
        debug: false,
        timeout: 6000,
        sync: true,
        logLevel: "off",
        //prefetchIgnore: false,
        prevent: ({el}) => el.classList && el.classList.contains('no-barba'),
        transitions: [{
            name: 'default-transition',
            once() {
                once();
            },
            beforeLeave(data) {
                beforeLeave(data);
            },
            leave(data) {
                // PERMET DE RENDRE LA TRANSITION ASYNCHRONE CHARGEMENT PENDANT QUE LA TRANSITION SE FAIT
                const done = this.async();
                leave(data, done, urlPartsToPreventPageChange, urlPartsToBlock);
            },

            afterLeave() {
            },

            beforeEnter({current, next}) {
            },

            enter(data) {
                enter(data);
            },

            after(data) {
                after(data, scripts);
            }
        }],
    });

    function once() {
        initComponents();
    }

    function beforeLeave(data) {
    }

    function afterLeave(data) {
    }

    function enter(data) {

        // Reset menu toggle
        const menuToggle = document.querySelector('#menu-toggle')
        if (menuToggle)
            menuToggle.classList.remove('active');

        // Reset scroll
        scroll(0, 0);

        // Reset scrollBehavior
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = "smooth";
        }, 1000);

        // BigImageSlider hooks
        initComponents();

        pageTransitionOpening(data);
    }

    function after(data, scripts) {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(data.next.html.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', data.next.html), 'text/html');
        let bodyClasses = htmlDoc.querySelector('notbody').getAttribute('class');
        document.body.setAttribute('class', bodyClasses);

        scripts.init();
    }

    function leave(data, done, urlPartsToPreventPageChange, urlPartsToBlock) {
        let href = data.next.url.href
        let preventPageChange = false;
        let prevent = false;

        // Keep from changing page for these urls
        urlPartsToPreventPageChange.forEach(url => {
            if (href.includes(url)) {
                preventPageChange = true;
            }
        })

        // Don't transition on these urls
        urlPartsToBlock.forEach(url => {
            if (href.includes(url)) {
                prevent = true;
            }
        })

        if (!prevent) {
            pageTransitionExiting(data, done);

            document.documentElement.style.scrollBehavior = "initial";
        } else {
            window.location.href = href
        }
    }
}
