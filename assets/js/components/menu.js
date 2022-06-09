export default function() {
    jQuery(($) => {
        $('.menu-toggle').click((e) => {
            $('.menu-toggle').toggleClass('active');
        })
    })
}