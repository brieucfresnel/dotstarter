jQuery(($) => {
    const layoutClass = '.f-big-image-slider';

    $(layoutClass).each(function () {
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

        $(sliderSelector).on('afterChange', function (event, slick) {
            let indexElem = $(layoutId).find('.current-index');

            const slidesCount = slick.$slides.length;
            const currentIndex = parseInt(indexElem.text());
            const nextIndex = (currentIndex + 1) > slidesCount ? 1 : currentIndex + 1;

            indexElem.text(nextIndex);
        });
    })
});