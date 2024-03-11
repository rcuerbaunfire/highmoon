(function (app) {
    ("use strict");

    var Carousel = function () { };

    const { mobile, tablet } = app.responsive();
    const smallScreens = tablet() || mobile();

    Carousel.prototype.init = function () {
        Carousel.prototype.resourceCarousel();
        Carousel.prototype.clientCarousel();
        app.Global.prototype.refreshScrollTriggers();
    };

    Carousel.prototype.resourceCarousel = function () {
        const carousels = $(".resource-carousel, .advisor-carousel");
        if (!carousels.length) return;

        carousels.each(function () {
            const self = $(this);
            const carousel = self.find(".owl-carousel");

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

            const nativePrev = self.find(".owl-prev");
            const nativeNext = self.find(".owl-next"); 

            const carouselPrev = self.find(".owl-arrow-l");
            const carouselNext = self.find(".owl-arrow-r"); 

            carouselNext.click(function () {
                carouselInstance.trigger("next.owl.carousel");
            });

            carouselPrev.click(function () {
                carouselInstance.trigger("prev.owl.carousel");
            });

            carouselPrev.addClass("disabled");

            carouselInstance.on("translated.owl.carousel", function (e) {
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

    Carousel.prototype.clientCarousel = function () {
        const carousel = $(".client-carousel");
        if (!carousel.length) return;

        carousel.owlCarousel({
            dots: false,
            nav: false,
            loop: true,
            margin: 60,
            autoplay: true,
            slideTransition: 'linear',
            autoplayTimeout: 0,
            autoplaySpeed: 12000,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 3,
                    margin: 60,
                    autoWidth: false,
                },
                1300: {
                    autoWidth: true,
                    margin: 60,
                }
            }
        });

        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: `(min-width: 768px)`,
            isMobile: `(max-width: 767px)`,

        }, (context) => {
            let { isDesktop, isMobile } = context.conditions;

            if (isDesktop) {
                if (carousel) {
                    carousel.trigger('refresh.owl.carousel');
                }
            }

            if (isMobile) {
                if (carousel) {
                    carousel.trigger('refresh.owl.carousel');
                }
            }

            return () => { }
        });
    };

    app.Carousel = Carousel;

    app.ready(function () {
        console.log("Carousel ->");
        Carousel.prototype.init();
    });
})(window.app);
