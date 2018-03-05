!function($, window, _) {
    window.SITE.overlay = {
        selector: ".overlay-effect .overlay",
        init: function(el) {
            var base = this, container = $(base.selector), target = el ? el.find(base.selector) : container;
            target.each(function() {
                var _this = $(this), overlayInner = _this.find(".child"), overlayHover = new TimelineLite({
                    paused: !0
                }), line = overlayInner.find("hr");
                TweenLite.set(overlayInner, {
                    opacity: 0,
                    y: 50
                }), overlayHover.add(TweenLite.to(_this, .3, {
                    opacity: 1,
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 10,
                    ease: Quart.easeOut
                })).add(TweenMax.staggerTo(overlayInner, .3, {
                    y: 0,
                    opacity: 1,
                    ease: Quart.easeOut
                }, .15)).add(TweenLite.to(line, .15, {
                    scaleX: 1,
                    ease: Quart.easeOut
                }), "-=0.25"), _this.hoverIntent(function() {
                    overlayHover.timeScale(1).play();
                }, function() {
                    overlayHover.timeScale(1.6).reverse();
                });
            });
        }
    };
}(jQuery, this, _);