// TODO : use gsap effects instead of this https://greensock.com/docs/v3/GSAP/gsap.effects

const gsapHeading1 = {
  y: 50,
  stagger: 0.05,
  opacity: 0,
  duration: 1.2,
  ease: 'power1'
}

const gsapHeading2 = {
  y: -20,
  stagger: 0.02,
  opacity: 0,
  duration: 1,
  ease: 'power2'
}

const gsapBeforeTitle = {
  opacity: 0,
  duration: 1,
  ease: 'power2'
}

const gsapParagraph = {
  opacity: 0,
  y: '1.5em',
  duration: 1.2,
  stagger: 0.1,
  ease: 'power2'
}

const gsapButtons = {
  y: 10,
  stagger: 0.05,
  opacity: 0,
  duration: 0.8,
  ease: 'power2'
}

const gsapFigureScale = {
  duration: 0.85,
  ease: 'power4.out',
  scale: 0.85,
  background: '#ffffff'
}

const gsapFigureOpacity = {
  duration: 0.85,
  ease: 'power4.out',
  opacity: 0
}

const gsapFigureScaleStagger = {
  duration: 0.85,
  ease: 'power4.out',
  scale: 0.85,
  background: '#ffffff'
}

const gsapFigureOpacityStagger = {
  duration: 0.85,
  ease: 'power4.out',
  opacity: 0,
  stagger: 0.1
}

const gsapFigureLabels = {
  y: 50,
  stagger: 0.05,
  opacity: 0,
  duration: 1.4,
  ease: 'power1'
}

export {
  gsapHeading1,
  gsapHeading2,
  gsapBeforeTitle,
  gsapParagraph,
  gsapButtons,
  gsapFigureScale,
  gsapFigureOpacity,
  gsapFigureScaleStagger,
  gsapFigureOpacityStagger,
  gsapFigureLabels
}
