'use strict';
var EVENT_KEY_WINDOW_RESIZE = 'window_resize',
    EVENT_KEY_WINDOW_SCROLL = 'window_scroll',
    EVENT_KEY_DOCUMENT_READY = 'document_ready';

var animationDuration = .4;

var $doc = $(document),
    win = $(window),
    Modernizr = window.Modernizr;

function initAppEvents(eventKey) {
    var appEvents = window.APP;
    for (var appEvent in appEvents) if (appEvents.hasOwnProperty(appEvent)) {
        var _method = appEvents[appEvent];
        (_method.events.indexOf(eventKey) !== -1 && void 0 !== _method.selector && void 0 !== _method.init && $(_method.selector).length > 0 && _method.init());
    }
}

!function($, window) {
    window.APP = [];
    win.resize(function() {
        initAppEvents(EVENT_KEY_WINDOW_RESIZE);
    });
    win.scroll(function() {
        initAppEvents(EVENT_KEY_WINDOW_SCROLL);
    });
    $doc.ready(function() {
        initAppEvents(EVENT_KEY_DOCUMENT_READY);
    });
}(jQuery, this);
!function ($, window) {
    window.APP.googleMap = {
        selector: ".google-map",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this),
                    mapcolor = that.data("map-style-color"),
                    mapislight = (that.data("map-is-light") != null),
                    mapzoom = that.data("map-zoom"),
                    maplat = that.data("map-center-lat"),
                    maplong = that.data("map-center-long"),
                    pinlatlong = that.data("latlong"),
                    pinimage = that.data("pin-image");

                var mapstyle = [
                    {
                        featureType: "all",
                        stylers: [
                            {
                                invert_lightness: (!mapislight)
                            },
                            {
                                saturation: -30
                            }
                        ]
                    },
                    {
                        featureType: "road",
                        stylers: [
                            {
                                color: (mapcolor) ? mapcolor : "#0000b0"
                            }
                        ]
                    }
                ];

                var centerlatLng = new google.maps.LatLng(maplat, maplong), mapOptions = {
                    center: centerlatLng,
                    styles: mapstyle,
                    zoom: mapzoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: !1,
                    panControl: !1,
                    zoomControl: !1,
                    mapTypeControl: !1,
                    scaleControl: !1,
                    streetViewControl: !1,
                    fullscreenControl: !1
                }, map = new google.maps.Map(that[0], mapOptions);
                google.maps.event.addListenerOnce(map, "tilesloaded", function () {
                    if (pinimage.length > 0) {
                        var pinimageLoad = new Image();
                        pinimageLoad.src = pinimage, $(pinimageLoad).on('load', function () {
                            base.setMarkers(map, pinlatlong, pinimage);
                        });
                    }
                });
            });
        },
        setMarkers: function (map, pinlatlong, pinimage) {
            function showPin(i) {
                var latlong_array = pinlatlong[i].lat_long.split(","),
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latlong_array[0], latlong_array[1]),
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: pinimage,
                        optimized: !1
                    });

                var contentString = (pinlatlong[i].hasOwnProperty('content') && pinlatlong[i].content) ? '<div class="marker-info-wrap">' + pinlatlong[i].content + '</div>' : null;
                if (typeof InfoBox !== 'undefined' && contentString) {
                    var infowindow = new InfoBox({
                            alignBottom: !0,
                            content: contentString,
                            disableAutoPan: !1,
                            maxWidth: 380,
                            closeBoxMargin: "10px 10px 10px 10px",
                            closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                            pixelOffset: new google.maps.Size(-193, -41),
                            zIndex: null,
                            infoBoxClearance: new google.maps.Size(1, 1)
                        });

                    infoWindows.push(infowindow),
                        google.maps.event.addListener(marker, "click", function (marker, i) {
                            return function () {
                                infoWindows[i].open(map, this);
                            };
                        }(marker, i));
                }
            }

            for (var infoWindows = [], i = 0; i + 1 <= pinlatlong.length; i++) setTimeout(showPin, 250 * i, i);
        }
    };
}(jQuery, this);
!function($, window) {
    window.APP.mobileMenu = {
        selector: ".mobile-menu-toggle",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function() {
            var base = this, container = $(base.selector), mobileMenuDom = $('.mobile-menu-wrapper');
            container.on("click", function() {
                return (mobileMenuDom.toggleClass('is-active') && container.toggleClass('is-active'));
            });
        }
    };
}(jQuery, this);
var smoothScrollOptions = {
    animationType 		: 'linear',
    speed 				: 500,
    stepAmount 			: 250,
    type 				: 'wheel'
};
!function ($, window) {
    window.APP.smoothScroll = {
        selector: 'html,body',
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            if (typeof $.fn.smoothScroll === "function") {
                container.smoothScroll(smoothScrollOptions);
            }
        }
    };
}(jQuery, this);

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
