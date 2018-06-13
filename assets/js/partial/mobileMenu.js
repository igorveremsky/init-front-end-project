var mobilemenuTimeline = new TimelineLite({
        paused: 1
    }),
    mobileHeaderDom = $('header .up'),
    mobileMenuDom = $('.mobile-menu-wrapper');

mobilemenuTimeline
    .set($('header'), {
        position: 'fixed'
    })
    .to(mobileHeaderDom, animationDuration, {
        backgroundColor: '#000',
        ease: animationColorEase
    })
    .fromTo(mobileMenuDom, animationDuration, {
        autoAlpha: 0,
        y: "-100%",
        ease: animationTransformEase
    }, {
        autoAlpha: 1,
        y: "0%"
    }, "-="+animationDuration);
!function ($, window) {
    window.APP.mobileMenu = {
        selector: ".mobile-menu-toggle",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            container.on("click", function () {
                container.toggleClass('is-active');

                if (container.hasClass('is-active')) {
                    mobilemenuTimeline.play();
                } else {
                    mobilemenuTimeline.reverse();
                }
            });
        }
    };
}(jQuery, this);