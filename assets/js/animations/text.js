// TODO : use gsap effects instead of this https://greensock.com/docs/v3/GSAP/gsap.effects

const gsapHeading1 = {
    y: -20,
    stagger: 0.03,
    opacity: 0,
    duration: 1,
}

const gsapHeading2 = {
    y: -20,
    stagger: 0.03,
    opacity: 0,
    duration: 1,
    ease: 'power2'
}

const gsapBeforeTitle = {}

const gsapParagraph = {
    opacity: 0,
    stagger: 0.1,
    ease: 'power2'
}

export {gsapHeading1, gsapHeading2, gsapBeforeTitle, gsapParagraph};