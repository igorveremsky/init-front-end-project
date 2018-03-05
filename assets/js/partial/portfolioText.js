!function ($, window, _) {
    window.SITE.portfolioText = {
        selector: ".portfolio-text-style",
        init: function() {
            var base = this, container = $(base.selector);
            TweenLite.set(container, {
                autoAlpha: 0,
                x: 100
            }), base.control(container), win.scroll(_.debounce(function() {
                base.control(container);
            }, 50)), win.resize(_.debounce(function() {
                base.control(container);
            }, 50));
        },
        control: function(el) {
            var off = .1, k = 0, l = el.length;
            el.filter(":in-viewport").each(function() {
                var _this = $(this);
                "0" === _this.css("opacity") && (TweenLite.to(_this, off * l, {
                    delay: k * off,
                    x: 0,
                    autoAlpha: 1,
                    ease: Quart.easeOut
                }), k++);
            });
        }
    };
}(jQuery, this, _);