!function ($, window, _) {
    window.SITE.animation = {
        selector: "#wrapper .animation:not(.animation-start)",
        init: function() {
            if ( 'undefined' !== typeof($.fn.waypoint ) ) {
                var base = this, container = $(base.selector);
                container.waypoint(function () {
                    $(this).addClass('animation-start');
                }, {offset: '85%'});
            }
        }
    };
}(jQuery, this, _);