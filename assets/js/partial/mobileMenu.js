!function ($, window, _) {
    window.SITE.mobileMenu = {
        selector: "#mobile-menu",
        init: function () {
            var menu = $("#mobile-menu"),
                items = menu.find(".mobile-menu>li,.menu-footer p, .select-wrapper"),
                toggle = $(".mobile-toggle"),
                span = toggle.find("span"),
                cc = menu.find(".spacer"),
                inner = menu.find(".menu-container"),
                tlMainNav = new TimelineLite({
                    paused: !0,
                    onStart: function () {
                        menu.css("display", "block");
                    },
                    onComplete: function () {
                        window.SITE.customScroll.init();
                    },
                    onReverseComplete: function () {
                        menu.css("display", "none");
                    }
                }),
                toggleHover = new TimelineLite({
                    paused: !0
                }),
                close = $(".panel-close");

            AnimationsArray.push(tlMainNav), AnimationsArray.push(toggleHover);

            tlMainNav.add(TweenLite.to(menu, .5, {
                autoAlpha: 1,
                ease: Quart.easeOut
            })).add(TweenLite.to(inner, .5, {
                x: 0,
                ease: Quart.easeOut
            })).staggerTo(items, .1 * items.length, {
                x: 0,
                opacity: 1,
                ease: Quart.easeOut
            }, .1);

            toggleHover.add(TweenLite.to(span, .5, {
                x: "0%",
                ease: Quart.easeOut
            })).add(TweenLite.to(toggle.find("div"), .5, {
                rotation: 90,
                ease: Quart.easeOut
            })).add(TweenLite.to(span.eq(0), .2, {
                y: "-2",
                ease: Quart.easeOut
            })).add(TweenLite.to(span.eq(2), .2, {
                y: "2",
                ease: Quart.easeOut
            }), "-=0.2");

            toggle.hover(function () {
                toggle.data("toggled") || toggleHover.restart();
            }, function () {
                toggle.data("toggled") || toggleHover.reverse();
            }).on("click", function () {
                return toggle.data("toggled") ? (tlMainNav.timeScale(1.6).reverse(), toggle.data("toggled", !1)) : (window.SITE.reverseAnimations.start([tlMainNav, toggleHover]),
                    tlMainNav.timeScale(1.6).restart(), toggle.data("toggled", !0)), !1;
            });

            cc.add(close).on("click", function () {
                tlMainNav.timeScale(1.6).reverse();
                toggleHover.reverse();
                toggle.data("toggled", !1);
            });
        }
    };
}(jQuery, this, _);