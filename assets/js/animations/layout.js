import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function () {
    // gsap.killTweensOf("*");
    // ScrollTrigger.killAll();
    // gsap.globalTimeline.kill();

    gsap.fromTo('.main-menu', {
        opacity: 0,
        y: "-100%",
        duration: 1,
    }, {
        opacity: 1,
        y: 0
    })
}