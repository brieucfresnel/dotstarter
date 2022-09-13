import Slider from "../components/sliders";

const singleEventsSlider = new Slider('c-events-single-slider', {
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    variableHeight: true,
});

export {singleEventsSlider};