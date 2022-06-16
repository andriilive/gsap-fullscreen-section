import $ from 'jquery'
import {gsap, ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin);

ScrollTrigger.defaults({
    markers: false
});

let randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

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
            .play();
    }

    // Titles 0
    const TitlesAnimationDuration = 0.3;
    const TitlesAnimationVars = {autoAlpha: 0, y: -150, duration: TitlesAnimationDuration};
    gsap.to($sections.not(':first-of-type').find('section-content-item__left').toArray(), TitlesAnimationVars);

    const CircleMoveDuration = 1.8;

    function circle_to_left() {
        gsap.to(circle, {x: -400, top: -500, duration: CircleMoveDuration});
    }

    circle_to_left();

    function switch_section(i) {

        // console.log(i);

        $sections.hide();
        const $section = $($sections[i]);
        const section = $section[0];
        $section.show();
        gsap.to('.section-content-item__left', TitlesAnimationVars);
        gsap.to(section.querySelector('.section-content-item__left'), {y: 0,autoAlpha: 1, duration: TitlesAnimationDuration});
        gsap.to(canvas, {background: randomColor, duration: 1});
        window.activeSection = i;

        let odd = window.activeSection % 2 !== 0;

        if (odd) {
            gsap.to(circle, {x: '100%', duration: CircleMoveDuration});
        } else {
            circle_to_left()
        }

    }

    window.sectionsContent = {
        0: 1,
        1: 1,
        2: 1,
        3: 1
    }

    function switch_section_content(i) {
        // console.log(i);

        const sectionContent1 = sections[i].querySelector('.section-content-item-card__1');
        const sectionContent2 = sections[i].querySelector('.section-content-item-card__2');

        const duration = 0.3;
        let isFistSectionVisible = $(sections[i]).attr('data-content') === '1';

        $(sectionContent1).attr('hidden', isFistSectionVisible);
        $(sectionContent2).attr('hidden', !isFistSectionVisible);
        $(sections[i]).attr('data-content', isFistSectionVisible ? '2' : '1');

        console.log($(sections[i]).attr('data-content'))
    }

    let sectionsChunks = [];
    let scrollPart = (sections.length - 1) * 2 + 2;

    for (let j = 0; j <= scrollPart; j++) {
        sectionsChunks.push([j * (100 / scrollPart), (j === 0 || j % 2 === 0) && j / 2]);
    }

    sectionsChunks.pop();

    console.log(sectionsChunks);

    sectionsChunks.forEach(function (value, index) {
        console.log(value);
    });

    const bodyAnimation = gsap.timeline();

    animate_canvas_elements(false);

    $sections.not(':first-of-type').hide();

    window.scrollProgress = 0;

    ScrollTrigger.create({
        id: 'canvas',
        trigger: canvas,
        start: 'top top',
        scrub: 10,
        pin: true,
        pinSpacing: true,
        end: `+=${sections.length * 100 * 2}% bottom`,
        toggleClass: 'j-active',
        onUpdate: self => {
            let {progress} = self;

            if (round(progress * 100) !== 0) {
                progress = round(progress * 100);
            }

            // console.log(progress)
            if ( window.scrollProgress === progress ) {
                return;
            }

            console.log(progress);

            window.scrollProgress = progress;

            sectionsChunks.forEach(function (value, index) {
                if (progress === round(value[0])) {
                    if (value[1] === false) {
                        switch_section_content(sectionsChunks[index - 1][1]);
                    } else {
                        switch_section(value[1]);
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

})