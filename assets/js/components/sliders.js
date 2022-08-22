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
                    const prevButtonSelector = `#${layoutSlug}-prev`;
                    const nextButtonSelector = `#${layoutSlug}-next`;

                    if (!$(sliderSelector).length) return;

                    let slider = $(sliderSelector).not('.slick-initialized').slick({
                        ...this.config,
                        prevArrow: prevButtonSelector,
                        nextArrow: nextButtonSelector,
                    });

                    $(sliderSelector).on('beforeChange', function (event, slick) {
                        let indexElem = $(layoutId).find('.current-index');

                        const slidesCount = slick.$slides.length;
                        const currentIndex = parseInt(indexElem.text());
                        const nextIndex = (currentIndex + 1) > slidesCount ? 1 : currentIndex + 1;

                        indexElem.text(nextIndex);
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
