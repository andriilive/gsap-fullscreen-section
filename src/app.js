import $ from 'jquery'
import {gsap, ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin);

// GASP NOT JQUERY ELEMENTS
const $canvas = $('#sections');
const canvas = $canvas[0];

const sections = gsap.utils.toArray('.section');
const sectionsButton = $('#sections-btn')[0];
const $circle = $('#sections-graphics');
const circle = $circle[0];

$canvas.css({'--bg-color': '#000'}).data('sections', sections.length);

ScrollTrigger.defaults({
    markers: false
});

let animation = gsap.timeline();

ScrollTrigger.create({
    trigger: canvas,
    id: 'canvas',
    pin: true,
});


gsap.utils.toArray('.section').forEach(function (section, i) {

    const activeSection = i - 1;

    let timeline = gsap.timeline();

    ScrollTrigger.create({
        trigger: section,
        pin: true,
        scrub: 1,
        animation: timeline
    });

    timeline
        .from(section, {autoAlpha: 0})
        .to(section, {autoAlpha: 0});

});