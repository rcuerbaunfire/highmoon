(function (app) {
    ("use strict");

    var Carousel = function () { };

    const { mobile, tablet } = app.responsive();
    const smallScreens = tablet() || mobile();

    Carousel.prototype.init = function () {
        Carousel.prototype.resourceCarousel();
        app.Global.prototype.refreshScrollTriggers();
    };

    Carousel.prototype.resourceCarousel = function () {
        const carousels = $(".resource-carousel");
        if (!carousels.length) return;

        carousels.each(function () {
            const self = $(this);
            const carousel = self.find(".owl-carousel");

            const nativePrev = self.find(".owl-prev");
            const nativeNext = self.find(".owl-next"); 

            const carouselPrev = self.find(".owl-arrow-l");
            const carouselNext = self.find(".owl-arrow-r"); 

            const carouselInstance = carousel.owlCarousel({
                items: 3,
                autoWidth: true,
                nav: true,
                margin: 20,
                dots: false,
                smartSpeed: 1000,
                loop: false,
                navRewind: false,
                responsive: {
                    0: {
                        margin: 16,
                    },
                    768: {
                        margin: 20,
                    },
                }
            });

            carouselNext.click(function () {
                carouselInstance.trigger("next.owl.carousel");
            });

            carouselPrev.click(function () {
                carouselInstance.trigger("prev.owl.carousel");
            });

            carouselPrev.addClass("disabled");

            carouselInstance.on("change.owl.carousel", function (event) {
                if (nativePrev.hasClass("disabled")) {
                    carouselPrev.addClass("disabled");
                } else {
                    carouselPrev.removeClass("disabled");
                }

                if (nativeNext.hasClass("disabled")) {
                    carouselNext.addClass("disabled");
                } else {
                    carouselNext.removeClass("disabled");
                }
            });
        });
    };

    app.Carousel = Carousel;

    app.ready(function () {
        console.log("Carousel ->");
        Carousel.prototype.init();
    });
})(window.app);
