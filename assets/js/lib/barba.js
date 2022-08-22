import {
    pageTransitionExiting,
    pageTransitionOpening
} from "../animations/loader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
/**
 * If the next page URL contains one of these strings, prevent page transition
 *
 * @type {string[]}
 */
const urlPartsToBlock = [
    'wp-admin',
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
    function once() {
        scripts.once();
    }

    function beforeLeave(data) {
        window.scrollTo(0, 0);
    }

    function afterLeave(data) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.classList.remove('menu-open');
    }

    function beforeEnter(data) {
        scripts.load();

        document.documentElement.style.scrollBehavior = "smooth";
    }

    function enter(data) {

        // Reset menu toggle
        const menuToggle = document.querySelector('#menu-toggle')
        if (menuToggle)
            menuToggle.classList.remove('active');

        pageTransitionOpening(data);
    }

    function after(data) {
        // Set new body classes
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(data.next.html.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', data.next.html), 'text/html');
        let bodyClasses = htmlDoc.querySelector('notbody').getAttribute('class');
        document.body.setAttribute('class', bodyClasses);

        // Set active menu item class
        const mainMenu = htmlDoc.querySelector('.main-menu');
        const updatedItems = mainMenu.querySelectorAll('.menu-item');
        document.querySelectorAll('.main-menu .menu-item').forEach((item, index) => {
            item.classList.value = updatedItems[index].classList.value;
        })
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

    // Init
    barba.init({
        debug: true,
        timeout: 6000,
        sync: false,
        logLevel: "debug",
        prevent: ({el}) => el.classList && el.classList.contains('no-barba'),
        transitions: [{
            name: 'default-transition',
            once() {
                once()
            },

            beforeLeave(data) {
                beforeLeave(data)
            },

            leave(data) {
                // PERMET DE RENDRE LA TRANSITION ASYNCHRONE CHARGEMENT PENDANT QUE LA TRANSITION SE FAIT
                const done = this.async();
                leave(data, done, urlPartsToPreventPageChange, urlPartsToBlock);
            },

            afterLeave(data) {
                afterLeave(data);
            },

            beforeEnter(data) {
                beforeEnter(data);
            },

            enter(data) {
                enter(data);
            },

            after(data) {
                after(data, scripts);
            }
        }],
    });
}
