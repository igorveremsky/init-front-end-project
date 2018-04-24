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