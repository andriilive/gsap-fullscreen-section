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

    gsap.to($sections.not(':first-of-type').find('.section-content').toArray(), {autoAlpha: 0, y: 500});

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
        console.log('move circle to odd? true -> left || false -> right', direction)

        if (!direction) {
            circlePositionVars = {left: 'unset', right: -400, top: -500, duration: duration};
        }

        gsap.to(circle, circlePositionVars);
    }

    function switch_section(i) {

        // console.log(i);

        $sections.hide();
        const $section = $($sections[i]);
        const section = $section[0];
        $section.show();
        gsap.to('.section-content', {autoAlpha: 0, y: 500});
        gsap.to(section.querySelector('.section-content'), {autoAlpha: 1, y: 0});
        gsap.to(canvas, {background: randomColor, duration: 1});
        window.activeSection = i;

        let odd = window.activeSection % 2 !== 0;
        move_circle(odd);

    }

    function switch_section_content(i) {
        console.log(i);

        const sectionContent1 = sections[i].querySelector('.section-content-item-card__1');
        const sectionContent2 = sections[i].querySelector('.section-content-item-card__2');

        console.log($sections.data('content'),'$sections.data(\'content\')');

        if ( $(sections[i]).data('content') === 1 ) {
            gsap.to(sectionContent1, {autoAlpha: 0, display: 'none', duration: 0.1})
            gsap.to(sectionContent2, {autoAlpha: 1, display: 'block', duration: 0.1})
            $(sections[i]).data('content', 2);
        } else {
            gsap.to(sectionContent2, {autoAlpha: 0, display: 'none', duration: 0.1})
            gsap.to(sectionContent1, {autoAlpha: 1, display: 'block', duration: 0.1})
            $(sections[i]).data('content', 1);
        }
    }

    let sectionsChunks = [];
    let scrollPart = (sections.length - 1) * 2 + 2;

    for (let j = 0; j <= scrollPart; j++) {
        sectionsChunks.push([j * (100 / scrollPart), (j === 0 || j % 2 === 0) && j / 2]);
    }

    sectionsChunks.pop();

    console.log(sectionsChunks);

    sectionsChunks.forEach(function (value, index){
        console.log(value);
    });

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

            sectionsChunks.forEach(function (value, index){
                if (progress === Math.round(value[0])) {

                    if (value[1] !== false) {
                        switch_section(value[1]);
                    } else {
                        switch_section_content(sectionsChunks[index - 1][1]);
                    }
                }
            });
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