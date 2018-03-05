!function ($, window, _) {
    window.SITE.showAllAwards = {
        selector: ".show-all-awards",
        init: function () {
            var base = this, container = $(base.selector), el = container.parents('.awards-wrap').find('.award-hide');
            container.each(function () {
                var _this = $(this);
                _this.on("click", function() {
                    _this.hide();
                    return TweenMax.staggerTo(el, .1 * el.length, {
                        autoAlpha: 1,
                        display: 'block',
                        ease: Quart.easeOut
                    }, .1), !1;
                });
            });
        }
    };
}(jQuery, this, _);