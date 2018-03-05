!function ($, window, _) {
    window.SITE.mouseScroll = {
        selector: ".mouse-scroll",
        init: function() {
            var base = this, container = $(base.selector);
            container.each(function() {
                var _this = $(this);
                _this.on("click", function() {
                    var p = _this.parents(".row"), h = p.height();
                    return TweenMax.to(window, 1, {
                        scrollTo: {
                            y: p.scrollTop() + h
                        },
                        ease: Quart.easeOut
                    }), !1;
                });
            });
        }
    };
}(jQuery, this, _);