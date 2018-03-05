!function ($, window, _) {
    window.SITE.sharePost = {
        selector: ".share-wrapper > .btn",
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var _this = $(this), target = _this.next(".share-container"), social = target.find(".social"),
                    cc = target.find(".spacer"), shareMain = new TimelineLite({
                        paused: !0,
                        onStart: function () {
                            target.css("display", "block");
                        },
                        onReverseComplete: function () {
                            target.css("display", "none");
                        }
                    }), el = target.find("h6, .boxed-icon");
                AnimationsArray.push(shareMain), shareMain.add(TweenLite.to(target, .5, {
                    autoAlpha: 1,
                    ease: Quart.easeOut
                })).staggerFrom(el, .1 * el.length, {
                    y: "50",
                    opacity: 0,
                    ease: Quart.easeOut
                }, .1), _this.on("click", function (e) {
                    return window.SITE.reverseAnimations.start([shareMain]), shareMain.timeScale(1.6).restart(), !1;
                }), cc.on("click", function () {
                    shareMain.timeScale(1.6).reverse();
                }), social.on("click", function () {
                    var left = screen.width / 2 - 320, top = screen.height / 2 - 220 - 100;
                    return window.open($(this).attr("href"), "mywin", "left=" + left + ",top=" + top + ",width=640,height=440,toolbar=0"),
                        !1;
                });
            });
        }
    };
}(jQuery, this, _);