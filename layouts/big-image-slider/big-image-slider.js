jQuery(($) => {
    $('.f-big-image-slider').on('afterChange', function(event, slick, currentSlide){
        const parentElt = $(event.target).parent();
        let indexElt = $(parentElt).find('.current-index');

        const slidesCount = slick.$slides.length;
        const currentIndex = parseInt(indexElt.text());
        const nextIndex = (currentIndex + 1) > slidesCount ? 1 : currentIndex + 1;

        indexElt.text(nextIndex);
    });
})