'use strict';
var EVENT_KEY_WINDOW_RESIZE = 'window_resize',
    EVENT_KEY_WINDOW_SCROLL = 'window_scroll',
    EVENT_KEY_WINDOW_SCROLL_END = 'window_scroll_end',
    EVENT_KEY_DOCUMENT_READY = 'document_ready';

// Animation variables
// Duration
var animationDuration = .4;

// Timing Functions
var animationCountEase = Power0.easeNone,
    animationFadeEase = Power0.easeNone,
    animationTransformEase = Sine.easeInOut,
    animationColorEase = Sine.easeInOut;

// Timeline variables
var preloadTimeline = new TimelineLite({
        // paused: 1
        // autoRemoveChildren: 1
    }),
    viewportTimeline = new TimelineLite({
        // paused: 1
        // autoRemoveChildren: 1,
        /*onComplete: function () {
            viewportTimeline.clear();
        },*/
        onUpdate: function () {
            // if (!viewportTimeline.isActive()) {
            //     viewportTimeline.delay(.5);
            // }
            // console.log('add animation');
            // viewportTimeline.clear();
        }
    });

var $doc = $(document),
    $win = $(window),
    Modernizr = window.Modernizr;

function initAppEvents(eventKey) {
    var appEvents = window.APP;
    for (var appEvent in appEvents) if (appEvents.hasOwnProperty(appEvent)) {
        var _method = appEvents[appEvent];
        (_method.events.indexOf(eventKey) !== -1 && void 0 !== _method.selector && void 0 !== _method.init && $(_method.selector).length > 0 && _method.init());
    }
}

// extension:
$.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function(){
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
};

!function($, window) {
    window.APP = [];
    $win.resize(function() {
        initAppEvents(EVENT_KEY_WINDOW_RESIZE);
    });
    $win.scroll(function() {
        initAppEvents(EVENT_KEY_WINDOW_SCROLL);
    });
    $doc.ready(function() {
        initAppEvents(EVENT_KEY_DOCUMENT_READY);
    });
    $win.scrollEnd(function(){
        initAppEvents(EVENT_KEY_WINDOW_SCROLL_END);
    }, 500);
}(jQuery, this);