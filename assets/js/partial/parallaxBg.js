!function ($, window, _) {
    window.SITE.parallaxBg = {
        selector: ".parallax-bg",
        init: function() {
            {
                var base = this;
                $(base.selector);
            }
            Modernizr.touch || $.stellar({
                horizontalScrolling: !1,
                verticalOffset: 40
            });
        }
    };
}(jQuery, this, _);