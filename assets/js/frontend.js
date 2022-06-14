import barba from './lib/barba';

// Components
import slick from 'slick-carousel';
import menu from './components/menu';

// Plugins
import woocommerce from './plugins/woocommerce';

jQuery(($) => {
    const scripts = {
        init: function () {
            menu();

            if ($("body").hasClass('woocommerce')) {
                woocommerce();
            }
        }
    }

    $(document).ready(() => {
        // Slick Sliders
        if (ajaxConfig.barbaActive) {
            barba(scripts);
        } else {
            scripts.init();
        }
    })
})