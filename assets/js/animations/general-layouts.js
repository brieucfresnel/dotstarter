import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function generalLayoutAnims() {
  const layoutClass = '.f-layout'
  const layouts = document.querySelectorAll(layoutClass)

  if (!layouts) return
  if (!document.querySelector('.f-layout')) return

  gsap.utils.toArray(layoutClass).forEach(layout => {
    new SplitText(layout.querySelector(`${layoutClass} .f-layout__title`), {
      type: 'words'
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: layout.querySelector(`${layoutClass} .l-container`),
        start: 'top 90%',
        toggleActions: 'play none play none'
      }
    })

    let delay = 0 // initial delay value, incremented for each element

    tl.add(function () {
      layout.classList.add('is-inview')
    }, delay)

    if (layout.querySelector(`${layoutClass} .f-layout__title`)) {
      tl.add(function () {
        layout.querySelector(`${layoutClass} .f-layout__title`).classList.add('is-inview')
      }, delay)
      delay += 0.2
    }
  })

  // Reset ScrollTrigger in case of reload
  ScrollTrigger.clearScrollMemory()
  window.history.scrollRestoration = 'manual'
}

export {
  generalLayoutAnims
}

export default function () { }
