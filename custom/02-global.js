(function (app) {
    "use strict";

    var Global = function () { };

    app.responsive = () => {
        //Reference breakpoints scss file for values
        const screenPresets = {
            mobile: 100,
            tablet: 768,
            tabletLandscape: 1100,
            laptop: 1366,
            desktop: 1440,
            desktopXL: 1600,
            desktopWide: 2000,
            desktop2KUP: 3000,
        };

        const width = window.innerWidth;

        return {
            mobile: () => {
                if (width < screenPresets.tablet - 1) return true;
                return false;
            },
            tablet: () => {
                if (width >= screenPresets.tablet && width < screenPresets.tabletLandscape - 1) return true;
                return false;
            },
            tabletLandscape: () => {
                if (width >= screenPresets.tabletLandscape && width < screenPresets.laptop - 1) return true;
                return false;
            },
            laptop: () => {
                if (width >= screenPresets.laptop && width < screenPresets.desktop - 1) return true;
                return false;
            },
            desktop: () => {
                if (width >= screenPresets.desktop && width < screenPresets.desktopXL - 1) return true;
                return false;
            },
            desktopXL: () => {
                if (width >= screenPresets.desktopXL && width < screenPresets.desktopWide - 1) return true;
                return false;
            },
            desktopWide: () => {
                if (width >= screenPresets.desktopXL && width < screenPresets.desktop2KUP - 1) return true;
                return false;
            },
            desktop2KUP: () => {
                if (width >= screenPresets.desktop2KUP) return true;
                return false;
            },
        };
    };

    const { mobile, tablet } = app.responsive();
    const smallScreens = tablet() || mobile();

    Global.prototype.init = function () {
        Global.prototype.socialSharing();
        Global.prototype.fixTagLinks();
        Global.prototype.handleFilterComponent();
    };

    Global.prototype.refreshScrollTriggers = function () {
        const triggers = ScrollTrigger.getAll();

        triggers.forEach(trigger => {
            trigger.refresh(true);
        });
    };

    Global.prototype.socialSharing = function () {
        const items = $(".social-link");
        if (!items.length) return;

        items.each(function (index) {
            const self = $(this);
            let sharingLink;

            if (self.hasClass("twitter")) {
                sharingLink = "https://twitter.com/share?url=" + window.location.href;

            } else if (self.hasClass("linkedin")) {
                sharingLink =
                    "https://www.linkedin.com/shareArticle?mini=true&url=" +
                    window.location.href;

            } else if (self.hasClass("facebook")) {
                sharingLink = "https://www.facebook.com/sharer/sharer.php?u=" +
                    window.location.href;

            } else if (self.hasClass("mail")) {
                sharingLink = "mailto:?&body=" + window.location.href;
            }

            self.attr("href", sharingLink);
        });
    };

    Global.prototype.fixTagLinks = function () {
        const items = $(".tag-link");
        if (!items.length) return;

        items.each(function (index) {
            const self = $(this);
            const href = self.attr("href");
            const value = self.text();
            let key = '';

            if (self.hasClass("type-tag")) {
                key = 'type';
            } else if (self.hasClass("topic-tag")) {
                key = 'topic';
            }

            if (key) {
                self.attr("href", `${href}?${key}=${value}`);
            }
        });
    };

    Global.prototype.handleFilterComponent = function () {
        const items = $(".filter-component");
        if (!items.length) return;

        function assignCheckboxName(labels) {
            labels.each(function (index) {
                const self = $(this);
                self.prev(".filter-checkbox").prop("name", self.text());
            });
        };

        function appendCMSScript() {
            const filterScript = document.createElement('script');
            filterScript.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js';
            filterScript.async = true;
            document.body.appendChild(filterScript);
        }

        items.each(function (index) {
            const self = $(this);
            const filterKeys = self.find(".filter-field").html().split('<br>');
            const filterCheckboxes = self.find(".filter-checkbox");
            const filterLabels = self.find(".filter-label");

            assignCheckboxName(filterLabels);
            console.log(filterKeys);

            if (filterKeys && filterKeys.length) {
                filterKeys.forEach(key => {
                    self.find(`.filter-checkbox[name='${key}']`).trigger("click");
                });
            } else {
                filterCheckboxes.trigger("click");
            }

            if (index != 0) {
                filterContainer.prop("fs-cmsfilter-element", `filters-${index + 1}`);
                filterList.prop("fs-cmsfilter-element", `list-${index + 1}`);
            }
        });

        appendCMSScript();
    };

    app.Global = Global;

    app.ready(function () {
        console.log("Global ->");
        Global.prototype.init();
    });
})(window.app);
