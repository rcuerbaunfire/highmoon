$(document).ready(function () {
    window.app.init();
});

$(window).on("load", function () {
    console.log("App ->");
    window.app.load();
});

window.onbeforeunload = function () {
    // window.scrollTo(0, 0);
    // if (window.innerWidth < 1200) {
    // $('body').css("opacity", "0");
    // window.scrollTo(0, 0);
    // }
};

onresize = (event) => {
    ScrollTrigger.refresh(true);
};

const resizeObserver = new ResizeObserver(entries => 
    ScrollTrigger.refresh(true)
)

// start observing a DOM node
resizeObserver.observe(document.body);

document.addEventListener('touchstart', resizeObserver, {passive: true});
