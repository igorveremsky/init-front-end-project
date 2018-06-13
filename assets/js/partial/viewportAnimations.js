var ANIMATION_KEY_OVERLAY_LEFT = 'a-o-l';
var ANIMATION_KEY_OVERLAY_BOTTOM = 'a-o-b';
var ANIMATION_KEY_APPEAR_BOTTOM = 'a-a-b';
var ANIMATION_KEY_APPEAR = 'a-a';

var ANIMATION_OVERLAY_CLASS = 'animate-overlay';
var ANIMATION_CONTENT_CLASS = 'animate-content';

// Appear variables
var appearCoordinateFrom = 50;

// Overlay variables
var animationBlockDuration = 1;
var animationBlockDelay = .1;
var overlayDuration = animationBlockDuration/2;

function animateOverlayLeft(animateDom) {
    if (animateDom.is(':empty') || animateDom.hasClass('animate')) {
        return !1;
    }

    animateDom.addClass('animate');
    var innerTagKey = (animateDom.is(':header') || animateDom.is(':text') || animateDom.is('a')) ? 'span' : 'div';
    var overlayClassKey = '.' + ANIMATION_OVERLAY_CLASS + ':first-child',
        overlayDom = animateDom.find(overlayClassKey),
        contentClassKey = '.' + ANIMATION_CONTENT_CLASS,
        contentDom = animateDom.find(contentClassKey);

    if (contentDom.length && overlayDom.length) {
        return !1;
    }

    if (!contentDom.length) {
        animateDom.html('<' + innerTagKey + ' class="' + ANIMATION_CONTENT_CLASS + '">' + animateDom.html() + '</' + innerTagKey + '>');
        contentDom = animateDom.find(contentClassKey);
    }
    if (!overlayDom.length) {
        animateDom.prepend('<' + innerTagKey + ' class="' + ANIMATION_OVERLAY_CLASS + '"></' + innerTagKey + '>');
        overlayDom = animateDom.find(overlayClassKey);
    }
    var timeline = initAnimationTimeline();
    timeline.set(animateDom, {
        autoAlpha: 1
    }).fromTo(overlayDom, overlayDuration, {
        left: '-100%',
        ease: animationTransformEase
    }, {
        left: '0%'
    }).fromTo(contentDom, overlayDuration, {
        autoAlpha: 0,
        ease: animationFadeEase
    }, {
        autoAlpha: 1
    }).to(overlayDom, overlayDuration, {
        left: '100%',
        ease: animationTransformEase
    }, '-=' + overlayDuration);
    addToViewPortTimeline(timeline);
}

function animateOverlayBottom(animateDom) {
    if (animateDom.is(':empty') || animateDom.hasClass('animate')) {
        return !1;
    }

    animateDom.addClass('animate');
    var innerTagKey = (animateDom.is(':header') || animateDom.is(':text') || animateDom.is('a')) ? 'span' : 'div';
    var overlayClassKey = '.' + ANIMATION_OVERLAY_CLASS + ':first-child',
        overlayDom = animateDom.find(overlayClassKey),
        contentClassKey = '.' + ANIMATION_CONTENT_CLASS,
        contentDom = animateDom.find(contentClassKey);

    if (contentDom.length && overlayDom.length) {
        return !1;
    }

    if (!contentDom.length) {
        animateDom.html('<' + innerTagKey + ' class="' + ANIMATION_CONTENT_CLASS + '">' + animateDom.html() + '</' + innerTagKey + '>');
        contentDom = animateDom.find(contentClassKey);
    }
    if (!overlayDom.length) {
        animateDom.prepend('<' + innerTagKey + ' class="' + ANIMATION_OVERLAY_CLASS + '"></' + innerTagKey + '>');
        overlayDom = animateDom.find(overlayClassKey);
    }
    var timeline = initAnimationTimeline();
    timeline.set(animateDom, {
        autoAlpha: 1
    }).fromTo(overlayDom, overlayDuration, {
        top: '100%',
        ease: animationTransformEase
    }, {
        top: '0%'
    }).fromTo(contentDom, overlayDuration, {
        autoAlpha: 0,
        ease: animationFadeEase
    }, {
        autoAlpha: 1
    }).to(overlayDom, overlayDuration, {
        top: '-100%',
        ease: animationTransformEase
    }, '-=' + overlayDuration);
    addToViewPortTimeline(timeline);
}

function animateAppearBottom(animateDom) {
    if (animateDom.hasClass('animate')) {
        return !1;
    }
    animateDom.addClass('animate');

    var timeline = initAnimationTimeline();
    timeline.fromTo(animateDom, animationBlockDuration, {
        autoAlpha: 0,
        y: appearCoordinateFrom,
        ease: animationTransformEase
    }, {
        autoAlpha: 1,
        y: 0
    });
    addToViewPortTimeline(timeline);
}

function animateAppear(animateDom) {
    if (animateDom.hasClass('animate')) {
        return !1;
    }
    animateDom.addClass('animate');

    var timeline = initAnimationTimeline();
    timeline.fromTo(animateDom, animationBlockDuration, {
        autoAlpha: 0,
        ease: animationFadeEase
    }, {
        autoAlpha: 1
    });

    addToViewPortTimeline(timeline);
}

function initAnimationTimeline() {
    return new TimelineLite({
        // paused: 1
    });
}

function addToViewPortTimeline(timeline) {
    var delay = (viewportTimeline.isActive()) ? "-="+(animationBlockDuration-animationBlockDelay) : "+="+animationBlockDelay;
    viewportTimeline.add(timeline, delay);
}

!function ($, window) {
    window.APP.viewportAnimations = {
        selector: ':in-viewport',
        events: [EVENT_KEY_DOCUMENT_READY, EVENT_KEY_WINDOW_SCROLL],
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this),
                    thatJsDom = this,
                    before = window.getComputedStyle(thatJsDom, ':before'),
                    beforeContent = before.content.replace(/[\"\']/g, '');

                if (that.css('opacity') !== "0" || beforeContent === "") {
                    return;
                }

                // that.fadeIn(500);
                // console.log(that, beforeContent);
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
                if (beforeContent === ANIMATION_KEY_APPEAR) {
                    // In viewport
                    animateAppear(that);
                }
                // viewportTimeline.play();
                // viewportTimeline.play();
                // console.log(viewportAnimationTimeline);
                // viewportAnimationTimeline.kill();
            });
        }
    };
}(jQuery, this);
