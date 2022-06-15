import $ from 'jquery'
import {gsap, ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin);

ScrollTrigger.defaults({
    markers: false
});

let randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

$(document).ready(function (e) {

    window.activeSection = 1;

    $('.sections-nav-button').click(function () {
        const $this = $(this);
        let target = $this.data('target');
        switch_section(target);

    });

    const $canvas = $('.sections');
    const canvas = $canvas[0];
    const canvasAnimation = gsap.timeline({paused: false});

    const circle = $('#sections-graphics')[0];
    const sectionsButton = $('#sections-btn')[0];

    const $sections = $('.section');
    const sections = $sections.toArray();
    const sectionsTimeline = gsap.timeline();

    function toggle_nav(state) {
        if (state) {
            console.log('enable navbar');
        } else {
            console.log('disable navbar');
        }
    }

    gsap.to(canvas, {background: randomColor});

    gsap.to($sections.not(':first-of-type').find('.section-content').toArray(), {autoAlpha: 0});

    const circleAnimationValues = {
        true: {scale: 1, duration: 0.3, ease: 'ease-in-out'},
        false: {scale: 0.7, duration: 0.3, ease: 'ease-in-out'},
    }

    const buttonAnimationValues = {
        true: {bottom: 40, duration: 0.15, ease: 'ease-in-out'},
        false: {bottom: -100, duration: 0.15, ease: 'ease-in-out'},
    }

    function animate_canvas_elements(isActive) {

        canvasAnimation
            .to(circle, circleAnimationValues[isActive])
            .to(sectionsButton, buttonAnimationValues[isActive])
            .play()
    }

    const duration = 1.8;
    let circlePositionVars = {left: -400, top: -500, duration: duration};
    gsap.to(circle, {left: -400, top: -500, duration: 0});

    function move_circle(direction) {

        gsap.to(circle, {background: randomColor});
        let vars = {};

        console.log('move circle to odd? true -> left || false -> right', direction)

        if (direction) {
            // to left
            gsap.to(circle, vars);
        } else {
            // to right
            circlePositionVars = {left: 'unset', right: -400, top: -500, duration: duration};
            gsap.to(circle, circlePositionVars);
        }
    }

    function switch_section(i) {
        $sections.hide();
        const $section = $($sections[i -1]);
        const section = $section[0];
        $section.show();
        gsap.to('.section-content', {autoAlpha: 0});
        gsap.to(section.querySelector('.section-content'), {autoAlpha: 1});
        gsap.to(canvas, {background: randomColor, duration: 1});
        window.activeSection = i;

        let odd = window.activeSection % 2 !== 0;
        move_circle(odd);

    }

    const bodyAnimation = gsap.timeline();

    animate_canvas_elements(false);

    $sections.not(':first-of-type').hide();

    ScrollTrigger.create({
        id: 'canvas',
        trigger: canvas,
        start: 'top top',
        scrub: true,
        pin: true,
        pinSpacing: true,
        end: `+=${sections.length * 100 * 2}% bottom`,
        toggleClass: 'j-active',
        onUpdate: self => {
            let {progress} = self;
            progress = Math.round(progress * 100);

            let i = 6;
            let x = 100 / i;
            let y = [];

            for (let j = 0; j <= i; j++) {
                y.push(j * x);
            }

            console.log(y);

            if (progress === 0) {
                switch_section(1);
            }

            if (progress === 25) {
                switch_section(2);
            }

            if (progress === 50) {
                switch_section(3);
            }

            if (progress === 75) {
                switch_section(4);
            }

        },
        // snap: {
        //   snapTo: [0, 0.25, 0.5, 0.75, 1],
        //     duration: 0.000001,
        //     delay: 0.0000001
        // },
        onSnapComplete: self => {
            // console.log('canvas onSnapComplete', self);
        },
        onToggle: self => {
            const {direction, isActive, progress} = self;
            // console.log('canvas onToggle',direction, isActive, progress, self);
            toggle_nav(isActive);
            animate_canvas_elements(isActive)
        }
    });

    /*sections.forEach(function (thisSection, i) {

        let ThisSectionAnimation = gsap.timeline();

        let tl = ScrollTrigger.create({
            trigger: thisSection,
            id: `section-${i}`,
            start: 'top top',
            scrub: true,
            animation: ThisSectionAnimation,
            end: 'bottom bottom',
            // snap: {
            //     snapTo: 1,
            //     delay: 0,
            //     duration: 0.01
            // }
        });

        ThisSectionAnimation.fromTo(thisSection,
            {
                scaleY: 0
            },
            {
                scaleY: 1
            },
        )

    });*/

})