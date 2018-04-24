var ANIMATION_KEY_OVERLAY_LEFT = 'a-o-l';
var ANIMATION_KEY_OVERLAY_BOTTOM = 'a-o-b';
var ANIMATION_KEY_APPEAR_BOTTOM = 'a-a-b';

var ANIMATION_OVERLAY_CLASS = 'animate-overlay';
var ANIMATION_CONTENT_CLASS = 'animate-content';

// Apeear variables
var appearEase = Power2.easeOut;
var appearDuration = .4;
var appearCoordinateFrom = 100;

// Overlay variables
var animationOverlayEase = Sine.easeInOut;

// Fade variables
var animationFadeEase = Sine.easeInOut;

function animateOverlayLeft(animateDom) {
    if (animateDom.is(':empty') || animateDom.hasClass('animate')) {
        return !1;
    }

    animateDom.addClass('animate');
    var innerTagKey = (animateDom.is(':header') || animateDom.is(':text') || animateDom.is('a')) ? 'span' : 'div';
    var overlayClassKey = '.'+ANIMATION_OVERLAY_CLASS+':first-child',
        overlayDom = animateDom.find(overlayClassKey),
        contentClassKey = '.'+ANIMATION_CONTENT_CLASS,
        contentDom = animateDom.find(contentClassKey);

    if (contentDom.length && overlayDom.length) {
        return !1;
    }

    if (!contentDom.length) {
        animateDom.html('<'+innerTagKey+' class="'+ANIMATION_CONTENT_CLASS+'">'+animateDom.html()+'</'+innerTagKey+'>');
        contentDom = animateDom.find(contentClassKey);
    }
    if (!overlayDom.length) {
        animateDom.prepend('<'+innerTagKey+' class="'+ANIMATION_OVERLAY_CLASS+'"></'+innerTagKey+'>');
        overlayDom = animateDom.find(overlayClassKey);
    }
    var timeline = new TimelineLite();
    timeline.set(animateDom, {
        autoAlpha: 1
    }).fromTo(overlayDom, animationDuration, {
        left: '-100%',
        ease: animationOverlayEase
    }, {
        left: '0%'
    }).fromTo(contentDom, animationDuration, {
        autoAlpha: 0,
        ease: animationFadeEase
    }, {
        autoAlpha: 1
    }).to(overlayDom, animationDuration, {
        left: '100%',
        ease: animationOverlayEase
    }, '-='+animationDuration);
}

function animateOverlayBottom(animateDom) {
    if (animateDom.is(':empty') || animateDom.hasClass('animate')) {
        return !1;
    }

    animateDom.addClass('animate');
    var innerTagKey = (animateDom.is(':header') || animateDom.is(':text') || animateDom.is('a')) ? 'span' : 'div';
    var overlayClassKey = '.'+ANIMATION_OVERLAY_CLASS+':first-child',
        overlayDom = animateDom.find(overlayClassKey),
        contentClassKey = '.'+ANIMATION_CONTENT_CLASS,
        contentDom = animateDom.find(contentClassKey);

    if (contentDom.length && overlayDom.length) {
        return !1;
    }

    if (!contentDom.length) {
        animateDom.html('<'+innerTagKey+' class="'+ANIMATION_CONTENT_CLASS+'">'+animateDom.html()+'</'+innerTagKey+'>');
        contentDom = animateDom.find(contentClassKey);
    }
    if (!overlayDom.length) {
        animateDom.prepend('<'+innerTagKey+' class="'+ANIMATION_OVERLAY_CLASS+'"></'+innerTagKey+'>');
        overlayDom = animateDom.find(overlayClassKey);
    }
    var timeline = new TimelineLite();
    timeline.set(animateDom, {
        autoAlpha: 1
    }).fromTo(overlayDom, animationDuration, {
        top: '100%',
        ease: animationOverlayEase
    }, {
        top: '0%'
    }).fromTo(contentDom, animationDuration, {
        autoAlpha: 0,
        ease: animationFadeEase
    }, {
        autoAlpha: 1
    }).to(overlayDom, animationDuration, {
        top: '-100%',
        ease: animationOverlayEase
    }, '-='+animationDuration);
}

function animateAppearBottom(animateDom) {
    if (animateDom.hasClass('animate')) {
        return !1;
    }
    animateDom.addClass('animate');

    var timeline = new TimelineLite();
    timeline.fromTo(animateDom, appearDuration, {
        opacity: 0,
        y: appearCoordinateFrom,
        ease: appearEase
    }, {
        opacity: 1,
        y: 0
    });
}

!function ($, window) {
    window.APP.viewportAnimations = {
        selector: ':in-viewport',
        events: [EVENT_KEY_DOCUMENT_READY, EVENT_KEY_WINDOW_SCROLL],
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var thatJsDom = this,
                    that = $(this),
                    before = window.getComputedStyle(thatJsDom, ':before'),
                    beforeContent = before.content.replace(/[\"\']/g, '');
                    if (beforeContent === ANIMATION_KEY_OVERLAY_LEFT) {
                        // In viewport
                        animateOverlayLeft(that);
                    }
                    if (beforeContent === ANIMATION_KEY_OVERLAY_BOTTOM) {
                        // In viewport
                        animateOverlayBottom(that);
                    }
                    if (beforeContent === ANIMATION_KEY_APPEAR_BOTTOM) {
                        // In viewport
                        animateAppearBottom(that);
                    }
                    // console.log(viewportAnimationTimeline);
                    // viewportAnimationTimeline.kill();
            });
        }
    };
}(jQuery, this);
