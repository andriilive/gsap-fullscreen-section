import $ from 'jquery'
import {gsap, ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin, Power2} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, CSSPlugin);

ScrollTrigger.defaults({
    markers: false
});

let randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
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
        true: {scale: 1, duration: 0.3, ease: Power2.easeOut},
        false: {scale: 0.7, duration: 0.3, ease: Power2.easeOut},
    }

    const buttonAnimationValues = {
        true: {bottom: 40, duration: 0.15, ease: Power2.easeOut},
        false: {bottom: -100, duration: 0.15, ease: Power2.easeOut},
    }

    function animate_canvas_elements(isActive) {
        canvasAnimation
            .to(circle, circleAnimationValues[isActive])
            .to(sectionsButton, buttonAnimationValues[isActive])
            .play();
    }

    // Titles 0
    const TitlesAnimationDuration = 0.6;
    const TitlesAnimationVars = {autoAlpha: 0, y: -150, duration: TitlesAnimationDuration, ease: Power2.easeOut};
    gsap.to($sections.not(':first-of-type').find('.section-content-item__left').toArray(), TitlesAnimationVars);

    const CircleMoveDuration = 1.8;

    function circle_to_left() {
        gsap.to(circle, {x: -400, top: -500, duration: CircleMoveDuration, ease: Power2.easeOut});
    }

    circle_to_left();

    function switch_section(i) {

        // console.log(i);

        $sections.hide();
        const $section = $($sections[i]);
        const section = $section[0];
        $section.show();
        gsap.to('.section-content-item__left', TitlesAnimationVars);
        gsap.to(section.querySelector('.section-content-item__left'), {y: 0,autoAlpha: 1, duration: TitlesAnimationDuration, ease: Power2.easeOut});
        gsap.to(canvas, {background: randomColor, duration: 1, ease: Power2.easeOut});
        window.activeSection = i;

        let odd = window.activeSection % 2 !== 0;

        if (odd) {
            gsap.to(circle, {x: '100%', duration: CircleMoveDuration, ease: Power2.easeOut});
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

    const sectionCardAnimationDuration = 0.5;
    gsap.to($sections.find('.section-content-item-card__1').toArray(), {y: 0, autoAlpha: 1, duration: sectionCardAnimationDuration, ease: Power2.easeOut});
    gsap.to($sections.find('.section-content-item-card__2').toArray(), {y: 500, autoAlpha: 0, duration: sectionCardAnimationDuration, ease: Power2.easeOut});

    function switch_section_content(i, scrollDirectionDown) {
        // console.log(i);

        const sectionContent1 = sections[i].querySelector('.section-content-item-card__1');
        const sectionContent2 = sections[i].querySelector('.section-content-item-card__2');

        if ( scrollDirectionDown ) {
            gsap.to(sectionContent1, {autoAlpha: 0, y: -500, duration: sectionCardAnimationDuration, ease: Power2.easeOut});
            gsap.to(sectionContent2, {autoAlpha: 1, y: 0, duration: sectionCardAnimationDuration, delay: 0.2, ease: Power2.easeOut});
        } else {
            gsap.to(sectionContent2, {autoAlpha: 0, y: 500, duration: sectionCardAnimationDuration, ease: Power2.easeOut});
            gsap.to(sectionContent1, {autoAlpha: 1, y: 0, duration: sectionCardAnimationDuration, delay: 0.2, ease: Power2.easeOut});
        }
        // console.log($(sections[i]).attr('data-content'))
    }

    let sectionsChunks = [];
    // let snapTo = [];
    let scrollPart = (sections.length) * 2;

    for (let j = 0; j <= scrollPart; j++) {
        sectionsChunks.push([j * (100 / scrollPart), (j === 0 || j % 2 === 0) && j / 2]);
        // snapTo.push( j * (100 / scrollPart / 100) )
    }

    sectionsChunks.pop();
    // console.log(sectionsChunks);
    // console.log(snapTo);

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
        end: `+=${sections.length * 100 * 3.2}% bottom`,
        toggleClass: 'j-active',
        onUpdate: self => {
            let {progress, direction} = self;

            if (round(progress * 100) !== 0) {
                progress = round(progress * 100);
            }

            // console.log(progress)
            if ( window.scrollProgress === progress ) {
                return;
            }

            // console.log(progress);

            window.scrollProgress = progress;

            sectionsChunks.forEach(function (value, index) {
                if (progress === round(value[0])) {

                    let scrollDirectionDown = (direction > 0);

                    if (value[1] === false) {
                        let switchToSectionCard = sectionsChunks[index - 1][1];
                        switch_section_content(switchToSectionCard, scrollDirectionDown);

                    } else {
                        let switchToSection = scrollDirectionDown ? value[1] : value[1] - 1;

                        if ( switchToSection < 0 ) {
                            return;
                        }

                        switch_section(switchToSection);
                    }
                }
            });
        },
        // snap: {
        //   snapTo: snapTo,
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