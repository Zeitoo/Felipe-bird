const playerAvatar = document.querySelector(".player");

const obstacles = window.document.querySelectorAll(".obstacle");

let seconds = 0;
let lastTiming = 0;

let intervalCreated = false;

window.addEventListener("click", () => {
    lastTiming = seconds;

    
    if (!intervalCreated) {
        setInterval(() => {
            seconds += 100;
            console.log(seconds)
        }, 100);
    }
    intervalCreated = true
    const clockInterval = ""
    intervalCreated = true;
    const topValue = document
        .querySelector(".player")
        .computedStyleMap()
        .getAll("top")[0].value;

        gsap.to(".player", {
        rotation: 27,
        top: `${topValue - 11}%`,
        duration: 0.1,
        ease: "none",
    });
});

setInterval(() => {
    const topValue = document
        .querySelector(".player")
        .computedStyleMap()
        .getAll("top")[0].value;

    if (seconds - lastTiming > 100 && topValue < 100) {
        gsap.to(".player", {
            rotation: 27,
            top: `${topValue + 3}%`,
            duration: 0.1,
            ease: "none",
        });
    }
}, 50);

setTimeout(() => {
    obstacles.forEach((element) => {
        const translateValue = Math.floor(Math.random() * 120);
        element.children[0].setAttribute(
            "style",
            `translate: 0 -${translateValue}px`
        );

        element.children[1].setAttribute(
            "style",
            `translate: 0 ${120 - translateValue}px`
        );
    });
}, 100);
