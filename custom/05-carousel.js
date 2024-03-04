(function (app) {
    ("use strict");

    var Carousel = function () { };

    const { mobile, tablet } = app.responsive();
    const smallScreens = tablet() || mobile();

    Carousel.prototype.init = function () {
        app.Global.prototype.refreshScrollTriggers();
    };

    app.Carousel = Carousel;

    app.ready(function () {
        console.log("Carousel ->");
        Carousel.prototype.init();
    });
})(window.app);
