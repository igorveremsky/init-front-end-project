!function ($, window, _) {
    window.SITE.postsNavOverlay = {
        selector: ".portfolio-nav",
        init: function () {
            var base = this, container = $(base.selector), nav = container.find("a");
            nav.each(function () {
                var _this = $(this), overlayInner = _this.find(".overlay"), overlayEl = _this.find("span"),
                    overlayHover = new TimelineLite({
                        paused: !0
                    });
                TweenLite.set(overlayInner, {
                    opacity: 0
                }), TweenLite.set(overlayEl, {
                    opacity: 0,
                    y: 20
                }), overlayHover.add(TweenLite.to(overlayInner, .25, {
                    opacity: 1,
                    ease: Quart.easeOut
                })).add(TweenMax.staggerTo(overlayEl, .25, {
                    y: 0,
                    opacity: 1,
                    ease: Quart.easeOut
                }, .1)), _this.hover(function () {
                    overlayHover.timeScale(1.6).restart();
                }, function () {
                    overlayHover.timeScale(1.6).reverse();
                });
            });
        }
    };
}(jQuery, this, _);