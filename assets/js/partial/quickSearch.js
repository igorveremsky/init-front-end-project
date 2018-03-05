!function($, window, _) {
    window.SITE.quickSearch = {
        selector: "#quick_search",
        init: function() {
            var base = this, container = $(base.selector), target = $("#searchpopup"), cc = target.find(".spacer"), el = target.find("p, input"), searchMain = new TimelineLite({
                paused: !0,
                onStart: function() {
                    target.css("display", "block");
                },
                onReverseComplete: function() {
                    target.css("display", "none");
                }
            });
            AnimationsArray.push(searchMain), searchMain.add(TweenLite.to(target, .5, {
                autoAlpha: 1,
                ease: Quart.easeOut
            })).staggerFrom(el, .2, {
                y: "50",
                opacity: 0,
                ease: Quart.easeOut
            }, .1), container.on("click", function() {
                return container.data("toggled") ? (searchMain.timeScale(1.6).reverse(), container.data("toggled", !1)) : (window.SITE.reverseAnimations.start([ searchMain ]),
                    searchMain.timeScale(1.6).restart(), container.data("toggled", !0)), !1;
            }), cc.on("click", function() {
                searchMain.timeScale(1.6).reverse(), container.data("toggled", !1);
            });
        }
    };
}(jQuery, this, _);