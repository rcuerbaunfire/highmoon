(function (app) {
    "use strict";

    var Animation = function () { };

    const { mobile, tablet, tabletLandscape, laptop, desktop, desktopXL, desktopWide } = app.responsive();
    const bigScreens = laptop() || desktop() || desktopXL() || desktopWide();
    const bigScreensV2 = bigScreens || tabletLandscape();
    const smallScreens = tablet() || mobile();

    let startingThreshold = bigScreens ? 80 : 90;

    Animation.prototype.init = function () {
        Animation.prototype.transitionPresets();
        Animation.prototype.handleAccordion();
    };

    Animation.prototype.transitionPresets = function (parent = '') {
        const stInstance = ScrollTrigger.create({ start: `top ${startingThreshold}%`, toggleActions: "play none none none", });
        const defaultTweenProps = { duration: 1.2, ease: Power2.easeOut };

        animatedCounter();

        function animatedCounter() {
            const elementsWithCounterEffect = gsap.utils.toArray(".transition-count");

            const floatNum = (val, decimals, dec_point, thousands_sep) => {
                dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
                thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

                const parts = val.toFixed(decimals).split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

                return parts.join(dec_point);
            }

            const wholeNum = (val) => {
                const parts = val.toString().split(".");
                return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            elementsWithCounterEffect.forEach((el) => {
                const textContainer = $(el);
                const targetValue = parseFloat(textContainer.text().replace(/,/g, ''));

                let counter = { val: 0 };

                if (Number.isInteger(targetValue)) {
                    gsap.to(counter, {
                        duration: 1.4,
                        val: targetValue,
                        onUpdate: function () {
                            textContainer.text(wholeNum(counter.val));
                        },
                        ease: Power3.easeOut,
                        scrollTrigger: {
                            trigger: el,
                            ...stInstance.vars,
                        },
                    });
                } else {
                    gsap.to(counter, {
                        duration: 1.4,
                        val: targetValue,
                        onUpdate: function () {
                            textContainer.text(floatNum(counter.val, 2));
                        },
                        ease: Power3.easeOut,
                        scrollTrigger: {
                            trigger: el,
                            ...stInstance.vars,
                        },
                    });
                }
            });
        }
    };

    Animation.prototype.handleAccordion = function () {
        const items = $(".accordion-item");
        if (!items.length) return;

        items.click(function () {
            const self = $(this);
            const body = self.find(".accordion-item-content");
            const plusLine = self.find(".ac-icon svg line:first-of-type");

            if (!self.hasClass("active")) {
                self.addClass("active");

                gsap.timeline()
                .set(plusLine, {
                    display: "none"
                })
                .fromTo(body,
                    {
                        height: 0,
                        autoAlpha: 0,
                    },
                    {
                        height: "auto",
                        duration: 0.6,
                        autoAlpha: 1,
                        ease: Power2.easeOut,
                        overwrite: true
                    }
                )

            } else {
                self.removeClass("active");

                gsap.timeline()
                .set(block, {
                    display: "none"
                })
                .to(body,
                    {
                        height: 0,
                        duration: 0.6,
                        ease: Power2.easeOut,
                        overwrite: true,
                        autoAlpha: 0,
                    }
                )
            }
        });
    };

    app.Animation = Animation;

    app.ready(function () {
        console.log("Animation ->");
        Animation.prototype.init();
    });
})(window.app);
