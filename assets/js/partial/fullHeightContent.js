!function($, window, _) {
    window.SITE.fullHeightContent = {
        selector: ".full-height-content",
        init: function() {
            var base = this, container = $(base.selector);
            base.control(container), win.resize(_.debounce(function() {
                base.control(container);
            }, 50));
        },
        control: function(container) {
            var h = $(".header"), a = $("#wpadminbar"), f = $(".footer-fixed"), ah = a ? a.outerHeight() : 0, fh = f.length ? $("#footer").outerHeight() : 0, is_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            container.each(function() {
                var _this = $(this), height = win.height() - h.outerHeight() - ah - fh;
                is_firefox ? _this.css("height", height) : _this.css("min-height", height);
            });
        }
    };
}(jQuery, this, _);