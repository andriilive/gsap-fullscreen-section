import $ from 'jquery'
import {gsap, ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin);

ScrollTrigger.defaults({
    markers: true
});

$(document).ready(function () {
    const $canvas = $('.sections');
    const canvas = $canvas[0];
    const canvasTimeline = gsap.timeline({paused: true});

    const circle = $('#sections-graphics')[0];
    const sectionsButton = $('#sections-btn')[0];

    function toggle_nav(state) {
        if (state) {
            console.log('enable navbar');
        } else {
            console.log('disable navbar');
        }
    }

    gsap.set(sectionsButton, {bottom: -100});
    gsap.set(circle, {scale: 0.7});

    ScrollTrigger.create({
        id: 'canvas',
        trigger: canvas,
        start: 'top top',
        end: 'bottom bottom',
        toggleClass: 'j-active',
        onToggle: self => {
            const {direction, isActive, progress} = self;
            // console.log('CanvasonToggle',direction, isActive, progress, self);
            toggle_nav(isActive);
        }
    })


    const $sections = $('#sections');
    const sections = gsap.utils.toArray('.section');
    const sectionsTimeline = gsap.timeline();

    $sections.css({'--bg-color': '#000'}).data('sections', sections.length);
});