class SlickSlider {
    constructor(layoutSlug, config) {
        this.sliders = [];
        this.layoutSlug = layoutSlug;
        this.config = config;
    }

    init() {
        this.reset();

        jQuery(($) => {
            $(document).ready(() => {
                const layoutSlug = this.layoutSlug;
                const layoutClass = '.' + this.layoutSlug;
                let sliders = this.sliders;

                $(layoutClass + ':not(.is-preview)').each((index, layout) => {
                    const layoutId = '#' + layout.id;

                    const sliderSelector = `${layoutId} ${layoutClass}__slider`;
                    const prevButtonSelector = `${layoutId} .btn-prev`;
                    const nextButtonSelector = `${layoutId} .btn-next`;

                    if (!$(sliderSelector).length) return;

                    let slider = $(sliderSelector).not('.slick-initialized').slick({
                        ...this.config,
                        prevArrow: prevButtonSelector,
                        nextArrow: nextButtonSelector,
                    });


                    $(sliderSelector).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                        let indexElem = $(layoutId).find('.current-index');
                        indexElem.text(nextSlide + 1);
                    });

                    sliders.push(slider);
                });
            })
        })
    };

    reset() {
        jQuery(($) => {
            this.sliders.forEach(slider => $(slider).slick('unslick'))
            this.sliders = [];
        })
    };
}

export default SlickSlider;
