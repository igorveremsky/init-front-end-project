!function($, window, _) {
    window.SITE.masonry = {
        selector: ".masonry",
        init: function() {
            var base = this, container = $(base.selector);
            container.each(function() {
                var that = $(this), el = that.children(".item"), loadmore = $(that.data("loadmore")), filters = that.find(".filters"), org = [], page = 1;
                if (TweenLite.set(el, {
                        opacity: 0,
                        y: 100
                    }), that.imagesLoaded(function() {
                        that.isotope({
                            itemSelector: ".item",
                            transitionDuration: 0,
                            masonry: {
                                columnWidth: ".grid-sizer"
                            }
                        }).isotope("once", "layoutComplete", function(i, l) {
                            org = _.pluck(l, "element");
                        }), that.isotope("layout"), win.scroll(_.debounce(function() {
                            that.is(":in-viewport") && TweenMax.staggerTo(org, 1, {
                                y: 0,
                                opacity: 1,
                                ease: Quart.easeOut
                            }, .25);
                        }, 50)).trigger("scroll"), loadmore.on("click", function() {
                            var text = loadmore.text(), type = loadmore.data("type"), loading = loadmore.data("loading"), nomore = loadmore.data("nomore"), initial = loadmore.data("initial"), categories = loadmore.data("categories"), count = loadmore.data("count"), post_initial = loadmore.data("postinitial"), style = loadmore.data("masonry");
                            if (!loadmore.hasClass("loading")) return loadmore.text(loading).addClass("loading"), $.post(themeajax.url, {
                                action: "thb_ajax",
                                count: count,
                                type: type,
                                initial: initial,
                                style: style,
                                categories: categories,
                                page: page++
                            }, function(data) {
                                var d = $.parseHTML($.trim(data)), l = d ? d.length : 0;
                                console.log(d);
                                "" === data || "undefined" === data || "No More Posts" === data || "No $args array created" === data ? (data = "",
                                    loadmore.hide()) : ($(d).appendTo(that).hide().imagesLoaded(function() {
                                    $(d).show(), window.SITE.equalArticlesHeight.init(), that.isotope("appended", $(d)), that.isotope("layout"), TweenMax.set($(d), {
                                        opacity: 0,
                                        y: 100
                                    }), TweenMax.staggerTo($(d), .25 * l, {
                                        y: 0,
                                        opacity: 1,
                                        ease: Quart.easeOut,
                                        onComplete: window.SITE.overlay.init($(d))
                                    }, .25);
                                }), count > l ? loadmore.hide() : loadmore.text(text).removeClass("loading"));
                            }), !1;
                        });
                    }), filters.length) {
                    var c = filters.next(".thb-toggle"), li = filters.find("li"), li_l = li.length, a = filters.find("a"), tl = new TimelineMax({
                        paused: !0
                    });
                    tl.to(c, .1, {
                        x: "-100%",
                        ease: Quart.easeOut
                    }).to(filters, 0, {
                        className: "+=active",
                        ease: Quart.easeOut
                    }).delay(.25).to(filters, .2, {
                        y: "0"
                    }).staggerFromTo(li, .1 * li_l, {
                        y: -20,
                        opacity: 0,
                        ease: Quart.easeOut
                    }, {
                        y: 0,
                        opacity: 1,
                        ease: Quart.easeOut
                    }, .1), c.on("click", function() {
                        return tl.timeScale(1).restart(), !1;
                    }), a.on("click", function() {
                        var _this = $(this), selector = _this.attr("data-filter");
                        return a.removeClass("active"), _this.addClass("active"), that.isotope("once", "layoutComplete", function(x, y) {
                            var iso_in = _.pluck(y, "element"), iso_out = _.difference(_.pluck(x.items, "element"), iso_in), iso_ani = new TimelineMax({
                                onComplete: function() {
                                    tl.timeScale(1.6).reverse();
                                }
                            });
                            TweenLite.set(iso_in, {
                                opacity: 0,
                                y: 100
                            }), iso_ani.staggerTo(iso_out, .1 * iso_out.length, {
                                y: 100,
                                autoAlpha: 0,
                                ease: Quart.easeOut
                            }, .1, !1, function() {
                                TweenMax.set(iso_out, {
                                    display: "none"
                                });
                            }).staggerTo(iso_in, .1 * iso_in.length, {
                                y: 0,
                                autoAlpha: 1,
                                ease: Quart.easeOut
                            }, .1);
                        }), that.isotope({
                            filter: selector
                        }), !1;
                    });
                }
            });
        }
    };
}(jQuery, this, _);