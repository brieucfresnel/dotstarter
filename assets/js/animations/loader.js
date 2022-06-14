import {
    gsap,
    Power3,
    Power4
} from 'gsap';

export function pageTransitionOpening(data) {
    gsap.from(data.next.container, {
        duration: 1,
        opacity: 0
    });
    gsap.to('#panel3', {
        opacity: 0,
        duration: 1
    });

    gsap.to('#panel2', {
        duration: 1,
        transformOrigin: "bottom right",
        scaleX: 0,
        ease: Power4.easeInOut,
        delay: 0.07
    });

    gsap.to('#panel1', {
        duration: 1,
        transformOrigin: "bottom right",
        scaleX: 0,
        ease: Power3.easeInOut
    });
}

export function pageTransitionExiting(data, done) {
    gsap.to('#panel2', {
        duration: 1,
        transformOrigin: "bottom left",
        scaleX: 1,
        ease: Power3.easeInOut
    });


    gsap.to('#panel1', {
        duration: 1,
        transformOrigin: "bottom left",
        scaleX: 1,
        ease: Power4.easeInOut,
        delay: 0.07,
        onComplete: function () {

            //done(); fonctionne pour l'asynchrone avec const done = this.async();
            done();

            //scrollTo(target, offset, duration, easing, disableLerp, callback)
        }
    });

    gsap.to('#panel3', {
        opacity: 1,
        duration: 1
    });

    // FADE OUT ALL CONTENT
    gsap.to(data.current.container, {
        duration: 1,
        opacity: 0
    });
}