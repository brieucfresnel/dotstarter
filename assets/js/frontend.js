import slick from 'slick-carousel';
import menu from './components/menu';

jQuery(($) => {
    $(document).ready(() => {
        // Slick Sliders
        $('.slick').slick();
        menu();
    })
})