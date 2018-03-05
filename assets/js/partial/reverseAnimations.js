!function ($, window, _) {
    window.SITE.reverseAnimations = {
        start: function(container) {
            // console.log(AnimationsArray);
            // console.log(container);
            for (var out = _.difference(AnimationsArray, container), i = 0; i < out.length; ++i) out[i].progress() > 0 && (out[i].timeScale(1.6).reverse(),
                $(".mobile-toggle").data("toggled", !1), $("#quick_search").data("toggled", !1));
        }
    };
}(jQuery, this, _);