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
        Animation.prototype.handleNav();
    };

    Animation.prototype.handleNav = function () {
        const nav = $(".navigation.w-nav");
        if (!nav.length) return;

        function toggleNav() {
            ScrollTrigger.create({
                trigger: "body",
                start: "top -10%",
                onUpdate: (self) => {
                    if (self.direction === 1) {
                        hideHeader(true);
                    } else {
                        hideHeader(false);
                    }
                },
            });

            function hideHeader(state) {
                if (state) {
                    if (nav.hasClass("nav-hidden") || nav.hasClass("mob-active")) return;
                    nav.addClass("nav-hidden");
                } else {
                    if (!nav.hasClass("nav-hidden")) return;
                    nav.removeClass("nav-hidden");
                }
            }
        }

        toggleNav();
    };

    Animation.prototype.transitionPresets = function (parent = '') {
        const stInstance = ScrollTrigger.create({ start: `top ${startingThreshold}%`, toggleActions: "play none none none", });
        const defaultTweenProps = { duration: 1.2, ease: Power2.easeOut };

        animatedTop();
        animatedCounter();
        animatedFade();
        animatedLeft();
        animatedRight();
        animatedLines();

        function animateDirection(type, x, y, alpha = false) {
            const elements = gsap.utils.toArray(`${parent} .transition-${type}`);

            if (elements.length) {
                elements.forEach((el) => {
                    const customTriggerDistance = $(el).data("trigger-distance");
                    let triggerPreset = customTriggerDistance ? { ...ScrollTrigger.create({ start: customTriggerDistance }).vars } : { ...stInstance.vars };

                    gsap.set(el, { x, y, autoAlpha: alpha ? 0 : 1 });
                    gsap.to(el, { ...defaultTweenProps, autoAlpha: 1, x: 0, y: 0, scrollTrigger: { ...triggerPreset, trigger: el } });
                });
            }
        }

        function animatedStagger(type, x, y, alpha) {
            const wrapper = gsap.utils.toArray(`${parent} .transition-${type}-stagger`);

            if (wrapper.length) {
                wrapper.forEach((wrap) => {
                    const mode = $(wrap).data("mode");
                    if (mode == 'desktop' && smallScreens) return;

                    const customTriggerDistance = $(wrap).data("trigger-distance");
                    let triggerPreset = customTriggerDistance ? { ...ScrollTrigger.create({ start: customTriggerDistance }).vars } : { ...stInstance.vars };
                    const children = [...wrap.children];

                    gsap.set(children, { x, y, autoAlpha: alpha ? 0 : 1, clearProps: "all" });
                    gsap.to(children, { autoAlpha: 1, x: 0, y: 0, stagger: { each: 0.3 }, duration: 0.8, scrollTrigger: { ...triggerPreset, trigger: children, invalidateOnRefresh: true } });
                });
            }
        }

        function animatedTop() {
            animateDirection("top", 0, 100, true);
        }

        function animatedLeft() {
            animateDirection("left", 60, 0);
        }

        function animatedRight() {
            animateDirection("right", -60, 0);
        }

        function animatedFade() {
            const fadedElements = gsap.utils.toArray(".transition-fade");
            if (fadedElements.length) {
                fadedElements.forEach((el) => {
                    gsap.set(el, { visibility: "hidden" });
                    gsap.from(el, { ...defaultTweenProps, autoAlpha: 0, scrollTrigger: { trigger: el, ...stInstance.vars, start: "top 80%" } });
                });
            }

            const fadedElementsDefault = gsap.utils.toArray(".transition-fade-default");
            if (fadedElementsDefault.length) {
                fadedElementsDefault.forEach((el) => {
                    const customTriggerDistance = $(el).data("trigger-distance");
                    let triggerPreset = customTriggerDistance ? { ...ScrollTrigger.create({ start: customTriggerDistance }).vars } : { ...stInstance.vars };

                    gsap.set(el, { visibility: "hidden" });
                    gsap.from(el, { ...defaultTweenProps, autoAlpha: 0, scrollTrigger: { trigger: el, ...triggerPreset } });
                });
            }
        }

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

        function animatedLines() {
            const elements = gsap.utils.toArray($(".transition-per-line"));

            if (elements.length) {
                elements.forEach((el) => {
                    const customTriggerDistance = $(el).data("trigger-distance");
                    let triggerPreset = {};

                    if (customTriggerDistance) {
                        const customStInstance = ScrollTrigger.create({
                            start: customTriggerDistance,
                        });

                        triggerPreset = {
                            ...customStInstance.vars,
                        };
                    } else {
                        triggerPreset = {
                            ...stInstance.vars,
                        };
                    }

                    const splitLines = new SplitText(el).lines;
                    const lineWrapper = new SplitText(el, {
                        linesClass: "overflow-hidden",
                        reduceWhiteSpace: false
                    });

                    gsap.set(el, {
                        autoAlpha: 1
                    })

                    // const splitLines = new SplitText(el, {
                    //     type: "lines",
                    //     linesClass: "overflow-hidden",
                    //     lineThreshold: 20,
                    // });

                    gsap.from(splitLines, {
                        ...defaultTweenProps,
                        yPercent: 100,
                        stagger: {
                            each: 0.14,
                        },
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: el,
                            ...triggerPreset,
                        },
                    });
                });
            }
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
                    .set(plusLine, {
                        display: "block"
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

        items[0].click();
    };

    Animation.prototype.handleLeaders = function () {
        const items = $(".leader-item");
        if (!items.length) return;

        items.each(function () {
            const self = $(this);
            const open = self.find(".leader-button");
            const popup = self.find(".leader-popup");
            const panel = self.find(".leader-panel");
            const close = self.find(".leader-popup-close");

            open.click(function () {
                app.Global.prototype.allowScroll(false);

                gsap.timeline({ defaults: { ease: Power3.easeOut, overwrite: true } })
                    .fromTo(popup,
                        {
                            autoAlpha: 0,
                            pointerEvents: "none"
                        },
                        {
                            autoAlpha: 1,
                            duration: 0.6,
                            pointerEvents: "auto"
                        }
                    )
                    .fromTo(panel,
                        {
                            x: "100%",
                        },
                        {
                            x: 0,
                            duration: 0.6,
                        },
                        "<0.4"
                    )
            });

            close.click(function () {

            });

            // if (!self.hasClass("active")) {
            //     self.addClass("active");

            //     gsap.timeline()
            //     .set(plusLine, {
            //         display: "none"
            //     })
            //     .fromTo(body,
            //         {
            //             height: 0,
            //             autoAlpha: 0,
            //         },
            //         {
            //             height: "auto",
            //             duration: 0.6,
            //             autoAlpha: 1,
            //             ease: Power2.easeOut,
            //             overwrite: true
            //         }
            //     )

            // } else {
            //     self.removeClass("active");

            //     gsap.timeline()
            //     .set(plusLine, {
            //         display: "block"
            //     })
            //     .to(body,
            //         {
            //             height: 0,
            //             duration: 0.6,
            //             ease: Power2.easeOut,
            //             overwrite: true,
            //             autoAlpha: 0,
            //         }
            //     )
            // }
        });

        items[0].click();
    };

    app.Animation = Animation;

    app.ready(function () {
        console.log("Animation ->");
        Animation.prototype.init();
    });
})(window.app);
