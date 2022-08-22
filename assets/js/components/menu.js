let toggle, menuWrapper, menuHamburger;

export default function () {
    toggle = document.querySelector('#menu-toggle');
    menuWrapper = document.querySelector('.main-menu');
    menuHamburger = document.querySelector('.mobile-menu');

    if (menuHamburger && toggle) {

        toggle.removeEventListener('click', toggleMenu);

        toggle.addEventListener('click', toggleMenu);
    }

    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);

        if (window.scrollY > 50) {
            if (!menuWrapper.classList.contains('is-condensed')) {
                menuWrapper.classList.add('is-condensed');
            }
        } else {
            if (menuWrapper.classList.contains('is-condensed')) {
                menuWrapper.classList.remove('is-condensed');
            }
        }
    });

    function toggleMenu() {
        // Prevent scroll top on menu open by calculating the current scroll

        toggle.classList.toggle('active');
        menuHamburger.classList.toggle('active');

        if (!document.body.classList.contains('menu-open')) {
            // Manage scroll before menu open
            const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
            const body = document.body;
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}`;

        } else {
            // Manage scroll before menu close
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo({
                left: 0,
                top: parseInt(scrollY || '0') * -1,
                behavior: 'auto'
            });
        }
        document.body.classList.toggle('menu-open')

    }
}
