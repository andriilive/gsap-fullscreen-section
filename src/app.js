import $ from 'jquery'
import {gsap, ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin);

$(document).ready(function () {

    // gsap.to(window, {duration: 2, scrollTo: "html"});

    // GASP NOT JQUERY ELEMENTS
    const $canvas = $('#sections');
    const canvas = $canvas[0];

    const sections = gsap.utils.toArray('.section');
    const sectionsButton = $('#sections-btn')[0];
    const $circle = $('#sections-graphics');
    const circle = $circle[0];

    // $canvas.css({'--bg-color': '#000'}).data('sections', sections.length);

    ScrollTrigger.defaults({
        markers: true
    });

    function go_to_section(i) {
        // console.log(sections[i].id)
        // gsap.to(window, {duration: 2, scrollTo: '#' + sections[i].id});
    }

    go_to_section(0);

    $canvas.css({'--bg-color': ' #2C225C'}).data('sections', sections.length);

    let canvasAnimation = gsap.timeline({paused: true});

    canvasAnimation
        .to('body', {overflow: 'hidden', duration: 0.3})
        .to('#sections-graphics', {width: 1278, height: 1278, top: -397, left: -462, opacity: 1, duration: 0.4})
        .to('#sections-btn', {bottom: 40})
        .to('body', {overflow: 'auto'});

    function canvasAnimationReset() {
        gsap.set('#sections-btn', {bottom: -100});
        gsap.set(sections, {display: 'none'})
        gsap.set(sections[0], {display: 'block'})
        gsap.set('#sections-graphics', {width: 771, height: 771, top: -547, left: -337, opacity: 0});
    }

    function canvasAnimationPlay() {
        gsap.to('#sections-btn', {bottom: 20, duration: 0.1});
        canvasAnimation.play();
    }

    canvasAnimationReset();

    ScrollTrigger.create({
        trigger: canvas,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: canvas,
        id: 'canvas',
        toggleClass: 'j-active',
        animation: canvasAnimation,
    });

    sections.forEach(function (thisSection, i) {

        let thisSectionAnimation = gsap.timeline();
        const thisSectionContent = thisSection.querySelector('.section-content');

        gsap.set(thisSectionContent, {autoAlpha: 0})
        // thisSectionAnimation.to(thisSectionContent, {opacity: 1, duration: 300})

        thisSectionAnimation.to(thisSectionContent, {autoAlpha: 1, duration: 0.2})

        ScrollTrigger.create({
            trigger: thisSection,
            id: 'section-' + i,
            pin: true,
            toggleClass: 'j-section-active',
            start: 'top top',
            end: 'top top',
            scrub: true,
            animation: thisSectionAnimation,
            onUpdate: self => {
                console.log(self.progress, self.direction);
            }
        });


        ScrollTrigger.create({

        });
    });

});