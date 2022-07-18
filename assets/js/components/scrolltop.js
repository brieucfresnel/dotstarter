const scrollTop = function(){
    jQuery(($) => {
        $('#scroll-top').click(() => {
           window.scroll({top: 0, left: 0, behavior: 'smooth'});
        })
    });
}

export default scrollTop;