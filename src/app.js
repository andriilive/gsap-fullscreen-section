import $ from 'jquery'
import {gsap, ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin);

$(document).ready(function () {

    const $sections = $('#sections');
    const sections = gsap.utils.toArray('.section');
    const section = gsap.utils.selector('.section');

    const circle = gsap.utils.selector('#sections-graphics');
    const sectionsButton = gsap.utils.selector('#sections-btn');

    const sectionsTimeline = gsap.timeline();

    // Defaults
    gsap.set(sectionsButton, {});

    // let scrollTween = gsap.to(sections, {
    //
    //     scrollTrigger: {
    //         trigger: "#sections",
    //         markers: true,
    //         animation: sectionsTimeline,
    //         id: '#sections',
    //         pin: true,
    //         snap: {
    //             delay: 0,
    //             snapTo: 1 / (sections.length - 1)
    //         },
    //         scrub: 0,
    //
    //         onEnter: (self) => {
    //             console.log("onEnter", self);
    //
    //             gsap.to(sectionsButton, {y: false, autoAlpha: 1})
    //         },
    //         onLeave: (self) => console.log("onLeave", self),
    //
    //         onUpdate: (self) => {
    //             // console.log('onUpdate', self)
    //         },
    //         onToggle: (self) => {
    //             console.log("onToggle", self, {active: self.isActive})
    //         },
    //         onScrubComplete: (self) => {
    //             console.log('onScrubComplete', self)
    //         },
    //         onSnapComplete: (self) => {
    //             console.log('onSnapComplete', self)
    //         }
    //
    //         // onEnterBack: () => console.log("enterBack"),
    //         // onLeaveBack: () => console.log("leaveBack"),
    //     }
    // });

    // sectionsTimeline.addLabel("intro-visible").to(sectionsButton, {autoAlpha: 1, y: 0});

    $sections.css({'--bg-color': '#000'}).data('sections', sections.length);
});