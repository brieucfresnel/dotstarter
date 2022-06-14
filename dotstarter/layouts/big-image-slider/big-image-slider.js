const BigImageSlider = {
    layoutClass: '.f-big-image-slider',

    init() {
        jQuery(($) => {
            $(this.layoutClass + ':not(.is-preview)').each(function () {
                const layoutClass = BigImageSlider.layoutClass;
                const layoutId = '#' + $(this).attr('id');

                const sliderSelector = `${layoutId} ${layoutClass}__slider`;
                const prevArrowSelector = `${layoutId} ${layoutClass}__prev`;
                const nextArrowSelector = `${layoutId} ${layoutClass}__next`;

                $(sliderSelector).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: true,
                    centerPadding: "0",
                    prevArrow: prevArrowSelector,
                    nextArrow: nextArrowSelector,
                });

                $(sliderSelector).on('beforeChange', function (event, slick) {
                    let indexElem = $(layoutId).find('.current-index');

                    const slidesCount = slick.$slides.length;
                    const currentIndex = parseInt(indexElem.text());
                    const nextIndex = (currentIndex + 1) > slidesCount ? 1 : currentIndex + 1;

                    indexElem.text(nextIndex);
                });
            })
        })
    },

    destroy() {
        jQuery(($) => {
            $(this.layoutClass + ':not(.is-preview)').each(function () {
                const layoutId = '#' + $(this).attr('id');
                const sliderSelector = `${layoutId} ${BigImageSlider.layoutClass}__slider`;

                $(sliderSelector).slick('unslick');
            });
        })
    }
}


export default BigImageSlider;

