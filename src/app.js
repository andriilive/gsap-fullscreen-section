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

    $canvas.css({'--bg-color': '#000'}).data('sections', sections.length);

    // Defaults
    function set_defaults() {
        // gsap.set(sectionsButton, {autoAlpha: 0, y: 500});
        // gsap.set(circle, {autoAlpha: 0, scale: 0});
    }

    set_defaults();

    ScrollTrigger.defaults({
        markers: true
    });

    const CanvasAnimation = gsap.timeline({paused: true});
    const SectionAnimation = gsap.timeline({paused: true});

    gsap.set(circle, {});

    CanvasAnimation
        .to('body', {overflow: 'hidden'})
        .to({circle},{y: -547, x: -342, scale: 0.6, duration: 0})

    ScrollTrigger.create({
        trigger: canvas,
        start: 'top top',
        end: 'bottom bottom',
        toggleClass: 'j-active',
        scrub: true,
        markers: true,
        id: "sections",
        onToggle: self => {
            console.log('canvasOnToggle', self.isActive)
        },
        onUpdate: self => {
            const {progress} = self;
        },

        /*top: -547px;
        left: -342px;
        transform: scale(0.6);*/

        onEnter: self => {

        }
    });

    sections.forEach(function (thisSection, i){

    });

    /*sections.forEach(function (thisSection, i) {
        console.log(i, thisSection, thisSection.nextElementSibling);

        // gsap.set(thisSection, {height: '250vh'});

        // let anim = gsap.timeline();
        //
        // ScrollTrigger.create({
        //     trigger: thisSection,
        //     pin: thisSection,
        //     start: 'top top',
        //     end: 'bottom bottom',
        //     scrub: 0,
        //     animation: anim
        // });
        //
        // anim.to(thisSection, {autoAlpha: 0});

        const sectionsTimeline = gsap.timeline(/!*{paused: true}*!/);

        const sectionsScrollTrigger = ScrollTrigger.create({
            trigger: thisSection,
            pin: true,
            start: 'top center',
            end: 'bottom center',
            toggleClass: 'j-active',
            scrub: true,
            // snap: {
            //     snapTo: 1 / 5
            // },
            animation: sectionsTimeline,
            id: "section-" + i,
            onToggle: self => {

                const {isActive, direction} = self;
                const $circle = $(circle);

                if (isActive) {
                    window.activeSection = i + 1;
                    // if true -> to right || if false <- to left
                    if (activeSection % 2 === 0) {

                    } else {
                        // sectionsTimeline.to(circle, {x: '100%'})
                    }
                }

                sectionsTimeline.fromTo(circle, {x: 0}, {x: '100%'});


                // 1 | 1

                // console.log('sectionOnToggle', self, circleDirection)
            },
            onUpdate: self => {
                const {progress} = self;
                // console.log('sectionProgress', progress)
            },
        });

        ScrollTrigger.create({
            target: thisSection,
            id: "section-" + i,
            pin: true,
            top: 'top top',
            start: 'top bottom',
            onEnter: self => {

            }
            // containerAnimation: containerAnimation,
        });

    })*/

});