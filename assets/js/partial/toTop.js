!function($, window, _) {
    window.SITE.toTop = {
        selector: "#scroll_totop",
        init: function() {
            var base = this, container = $(base.selector);
            container.on("click", function() {
                return TweenMax.to(window, .5, {
                    scrollTo: {
                        y: 0
                    },
                    ease: Quart.easeOut
                }), !1;
            }), win.scroll(_.debounce(function() {
                base.control();
            }, 50));
        },
        control: function() {
            var base = this, container = $(base.selector);
            $doc.height() - (win.scrollTop() + win.height()) < 300 ? TweenMax.to(container, .2, {
                autoAlpha: 1,
                ease: Quart.easeOut
            }) : TweenMax.to(container, .2, {
                autoAlpha: 0,
                ease: Quart.easeOut
            });
        }
    };
}(jQuery, this, _);