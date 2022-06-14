import {gsap, ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const scenes = gsap.utils.toArray(".scene");

ScrollTrigger.defaults({
    markers: true
})

// Pinned scene
scenes.forEach((scene, i) => {

    ScrollTrigger.create({
        trigger: scene,
        scrub: true,
        pin: true,
        id: `scene-${i}`,
        start: 'top top',
        end: "+=100%",
        //    snap: {
        //      snapTo: 1,
        //      duration: { min: 0.2, max: 1 },
        //      delay: 0.1
        //    },
    });


    const tl = gsap.timeline();

    const container = scene.querySelector(".container");

    const title = scene.querySelector("h1");

    tl.from(title, {
        y: 20,
        opacity: 0,
        // transformOrigin: "50% 50%",
        duration: 1000,
        // delay: 5,
        scrollTrigger: {
            start: "top 40%",
            end: "top 30%",
            trigger: title,
            scrub: true,
            //     id: `container-${i}`
            markers: false
        }
    });

    const inner = scene.querySelector(".inner");

    tl.to(inner, {
        y: -150,
        opacity: 0,
        // transformOrigin: "50% 50%",
        duration: 1000,
        // delay: 5,
        scrollTrigger: {
            start: "top 20%",
            end: "top 10%",
            trigger: title,
            scrub: true,
            //     id: `container-${i}`
            markers: true
        }
    })

    const card = scene.querySelector(".card");

    tl.from(card, {
        y: 150,
        opacity: 0,
        // transformOrigin: "50% 50%",
        duration: 1000,
        // delay: 5,
        scrollTrigger: {
            start: "top 20%",
            end: "top 10%",
            trigger: title,
            scrub: true,
            //     id: `container-${i}`
            markers: false
        }
    })

});

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

const circle = document.getElementById('circle');

const handleScroll = () => {
    const prc = getScrollPercent();
    console.log(prc);

    switch (true) {
        case prc > 60:
            circle.style.top = '60%';
            circle.style.left = '60%';
            break;
        case prc > 30:
            circle.style.top = '-10%';
            circle.style.left = '70%';
            break;
        default:
            circle.style.top = '-40%';
            circle.style.left = '-30%';
            break;
    }
};

window.addEventListener('scroll', handleScroll);


//
// ScrollTrigger.create({
//     start: 0,
//     end: "max",
//     snap: 1 / (scenes.length * 2 - 1)
// });