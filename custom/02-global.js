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
        
    };

    Global.prototype.refreshScrollTriggers = function () {
        const triggers = ScrollTrigger.getAll();

        triggers.forEach(trigger => {
            trigger.refresh(true);
        });
    };

    app.Global = Global;

    app.ready(function () {
        console.log("Global ->");
        Global.prototype.init();
    });
})(window.app);
