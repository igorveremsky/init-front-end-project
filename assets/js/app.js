!function($, window, _) {
    "use strict";
    for (var lastTime = 0, vendors = [ "ms", "moz", "webkit", "o" ], x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        return lastTime = currTime + timeToCall, id;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    });
}(jQuery, this, _);
var $doc = $(document), win = $(window), Modernizr = window.Modernizr, AnimationsArray = [];

!function($, window, _) {
    window.SITE = {
        init: function() {
            {
                var self = this, content = $("#wrapper"); pl = content.find(">.preloader");
                    /*before_hide_preloader_methods = [
                        'fullHeightContent',
                        'equalHeights',
                        'masonry'
                    ];*/
            }
            content.waitForImages({
                finished: function(loaded, count, success) {
                    $('#wrapper').css('padding-bottom', $('footer').innerHeight());
                    TweenMax.to(pl, 1, {
                        autoAlpha: 0,
                        ease: Quart.easeOut,
                        onComplete: function () {
                            pl.css("display", "none");
                        }
                    });
                    /*
                     var big_masonry_block_h = $('.thb-portfolio').find('article').eq(0).height();
                     var medium_masonry_block_h = $('.thb-portfolio').find('article').eq(2).height();
                     //alert(medium_masonry_block_h);
                     var text_article = $('.simple-text-article');
                     text_article.css('height',big_masonry_block_h - medium_masonry_block_h+'px');
                     var right_height = text_article.height() + medium_masonry_block_h + $('.thb-portfolio').find('article').eq(5).height() + $('.thb-portfolio').find('article').eq(10).height();
                     var left_height =big_masonry_block_h + $('.thb-portfolio').find('article').eq(3).height() + $('.thb-portfolio').find('article').eq(6).height()+ $('.thb-portfolio').find('article').eq(8).height();
                     console.log(right_height);
                     console.log(left_height);*/

                    for (var obj in self) if (self.hasOwnProperty(obj)) {
                        var _method = self[obj];
                        (void 0 !== _method.selector && void 0 !== _method.init && $(_method.selector).length > 0 && _method.init());
                    }
                },
                /*each: function(loaded, count, success) {
                    if(loaded==13) {
                        for (var obj in self) if (self.hasOwnProperty(obj)) {
                            var _method = self[obj];
                            before_hide_preloader_methods.indexOf(obj) !== -1 && void 0 !== _method.selector && void 0 !== _method.init && $(_method.selector).length > 0 && _method.init();
                        }
                    }
                    if(loaded==14) {
                        TweenMax.to(pl, 1, {
                            autoAlpha: 0,
                            ease: Quart.easeOut,
                            onComplete: function () {
                                pl.css("display", "none");
                            }
                        });
                    }
                },*/
                waitForAll: true
            });
        }
    };

    win.resize(function() {
        /*window.SITE.equalArticlesHeight.init();*/
        $('#wrapper').css('padding-bottom', $('footer').innerHeight());
    });
    win.scroll(function() {

    });

    $doc.ready(function() {
        window.SITE.init();
    });
}(jQuery, this, _);
!function ($, window, _) {
    window.SITE.animation = {
        selector: "#wrapper .animation:not(.animation-start)",
        init: function() {
            if ( 'undefined' !== typeof($.fn.waypoint ) ) {
                var base = this, container = $(base.selector);
                container.waypoint(function () {
                    $(this).addClass('animation-start');
                }, {offset: '85%'});
            }
        }
    };
}(jQuery, this, _);
!function ($, window, _) {
    $.fn.clickToggle = function (func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function () {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };

    window.SITE.contactMap = {
        selector: ".google-map",
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this), mapzoom = that.data("map-zoom"), maplat = that.data("map-center-lat"),
                    maplong = that.data("map-center-long"), pinlatlong = that.data("latlong"),
                    pinimage = that.data("pin-image"), expand = that.next(".expand"),
                    tw = that.width(), mapstyle = [{
                        featureType: "all",
                        stylers: [{
                            hue: "#0000b0"
                        }, {
                            invert_lightness: "true"
                        }, {
                            saturation: -30
                        }]
                    }];

                var centerlatLng = new google.maps.LatLng(maplat, maplong), mapOptions = {
                    center: centerlatLng,
                    styles: mapstyle,
                    zoom: mapzoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: !1,
                    panControl: !1,
                    zoomControl: !1,
                    mapTypeControl: !1,
                    scaleControl: !1,
                    streetViewControl: !1,
                    fullscreenControl: !1
                }, map = new google.maps.Map(that[0], mapOptions);
                google.maps.event.addListenerOnce(map, "tilesloaded", function() {
                    if (pinimage.length > 0) {
                        var pinimageLoad = new Image();
                        pinimageLoad.src = pinimage, $(pinimageLoad).load(function() {
                            base.setMarkers(map, pinlatlong, pinimage);
                        });
                    } else base.setMarkers(map, pinlatlong, pinimage);
                }), TweenLite.to(that, 2, {
                    width: tw,
                    ease: Quart.easeOut,
                    onUpdate: function() {
                        google.maps.event.trigger(map, "resize"), map.setCenter(centerlatLng);
                    }
                });
                expand.clickToggle(function() {
                    var w = that.parents(".post-content").width();
                    return that.parents(".contact-map").css("overflow", "visible"), TweenLite.to(that, 2, {
                        width: w,
                        ease: Quart.easeOut,
                        onUpdate: function() {
                            google.maps.event.trigger(map, "resize"), map.setCenter(centerlatLng);
                        }
                    }), !1;
                }, function() {
                    return TweenLite.to(that, 2, {
                        width: tw,
                        ease: Quart.easeOut,
                        onUpdate: function() {
                            google.maps.event.trigger(map, "resize"), map.setCenter(centerlatLng);
                        },
                        onComplete: function() {
                            that.parents(".contact-map").css("overflow", "hidden");
                        }
                    }), !1;
                });
            });
        },
        setMarkers: function (map, pinlatlong, pinimage) {
            function showPin(i) {
                var latlong_array = pinlatlong[i].lat_long.split(","), marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latlong_array[0], latlong_array[1]),
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: pinimage,
                        optimized: !1
                    }),
                    contentString = '<div class="marker-info-win"><img src="' + pinlatlong[i].image + '" class="image" /><div class="marker-inner-win"><h1 class="marker-heading">' + pinlatlong[i].title + "</h1><p>" + pinlatlong[i].information + "</p></div></div>",
                    infowindow = new InfoBox({
                        alignBottom: !0,
                        content: contentString,
                        disableAutoPan: !1,
                        maxWidth: 380,
                        closeBoxMargin: "10px 10px 10px 10px",
                        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                        pixelOffset: new google.maps.Size(-193, -41),
                        zIndex: null,
                        infoBoxClearance: new google.maps.Size(1, 1)
                    });
                infoWindows.push(infowindow), google.maps.event.addListener(marker, "click", function (marker, i) {
                    return function () {
                        infoWindows[i].open(map, this);
                    };
                }(marker, i));
            }

            for (var infoWindows = [], i = 0; i + 1 <= pinlatlong.length; i++) setTimeout(showPin, 250 * i, i);
        }
    };
}(jQuery, this, _);
!function ($, window, _) {
    window.SITE.customScroll = {
        selector: ".custom_scroll",
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this);
                that.perfectScrollbar({
                    wheelPropagation: !1,
                    suppressScrollX: !0
                });
            }), win.resize(function () {
                base.resize(container);
            });
        },
        resize: function (container) {
            container.perfectScrollbar("update");
        }
    };
}(jQuery, this, _);
!function($, window, _) {
    window.SITE.equalArticlesHeight = {
        selector: ".blog-section article",
        init: function() {
            var emSize = parseFloat($("body").css("font-size"));
            if (win.width() > emSize*40.063) {
                var articleInRow = (win.width() > emSize * 64.063) ? 4 : 2;
                var base = this, container = $(base.selector), maxArticleRowHeight = 0,
                    textLineHeight = parseFloat(container.find('.post-content p').css('line-height')),
                    articleCount = container.length;

                container.each(function (i) {
                    var trueIndex = i + 1;
                    //console.log('-------rowIndex='+i+'----------');
                    var articleWrap = $(this), articleHeight = articleWrap.height();
                    if (articleHeight > maxArticleRowHeight) maxArticleRowHeight = articleHeight;

                    if (trueIndex % articleInRow == 0 || trueIndex == articleCount) {
                        //console.log('-------maxRowHeight='+maxArticleRowHeight+'----------');
                        //console.log('-------rowIndex=' + trueIndex + '----------');
                        for (var j = trueIndex - articleInRow + (trueIndex % articleInRow); j < trueIndex; j++) {
                            //console.log('-------j=' + j + '----------');
                            var currentArticle = $('.blog-section article:eq(' + j + ')'),
                                currentArticleHeight = currentArticle.height(),
                                articleThumbHeight = currentArticle.children('figure').outerHeight(true),
                                articleHeaderHeight = currentArticle.children('header').outerHeight(true),
                                articleLinkHeight = currentArticle.children('a').outerHeight(true),
                                articleText = currentArticle.find('.post-content p'),
                                articleTextMargin = articleText.outerHeight(true) - articleText.outerHeight();
                            //console.log(currentArticleHeight);

                            if (currentArticleHeight !== maxArticleRowHeight) {
                                var textNewHeightPx = maxArticleRowHeight - articleTextMargin - articleThumbHeight - articleHeaderHeight - articleLinkHeight,
                                    textLineCount = parseInt(textNewHeightPx / textLineHeight),
                                    textNewHeightEm = textLineCount * 1.6;

                                //console.log(textNewHeightPx, textLineCount, textNewHeightEm);

                                /*
                                var textNewMargin = maxArticleRowHeight - $(this).height();

                                var rect = $(this)[0].getBoundingClientRect();

                                var newArticleHeight;

                                if (rect.height) {
                                    // `width` is available for IE9+
                                    newArticleHeight = rect.height;
                                } else {
                                    // Calculate width for IE8 and below
                                    newArticleHeight = rect.top - rect.bottom;
                                }

                                console.log(textNewMargin, newArticleHeight, rect.height);
                                */
                                //console.log(maxArticleRowHeight);
                                articleText.height(textNewHeightEm + 'em').css('-webkit-line-clamp', textLineCount.toString());
                                currentArticle.height(maxArticleRowHeight);
                            }
                        }
                        maxArticleRowHeight = 0;
                    }
                });
            }
        }
    };
}(jQuery, this, _);
!function($, window, _) {
    window.SITE.equalHeights = {
        selector: "[data-equal]",
        init: function() {
            var base = this, container = $(base.selector);
            container.each(function() {
                var that = $(this), children = that.data("equal");
                that.waitForImages(function() {
                    that.find(children).matchHeight(!0);
                });
            });
        }
    };
}(jQuery, this, _);
!function($, window, _) {
    window.SITE.fullHeightContent = {
        selector: ".full-height-content",
        init: function() {
            var base = this, container = $(base.selector);
            base.control(container), win.resize(_.debounce(function() {
                base.control(container);
            }, 50));
        },
        control: function(container) {
            var h = $(".header"), a = $("#wpadminbar"), f = $(".footer-fixed"), ah = a ? a.outerHeight() : 0, fh = f.length ? $("#footer").outerHeight() : 0, is_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            container.each(function() {
                var _this = $(this), height = win.height() - h.outerHeight() - ah - fh;
                is_firefox ? _this.css("height", height) : _this.css("min-height", height);
            });
        }
    };
}(jQuery, this, _);
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
!function ($, window, _) {
    window.SITE.parallaxBg = {
        selector: ".parallax-bg",
        init: function() {
            {
                var base = this;
                $(base.selector);
            }
            Modernizr.touch || $.stellar({
                horizontalScrolling: !1,
                verticalOffset: 40
            });
        }
    };
}(jQuery, this, _);
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
!function ($, window, _) {
    window.SITE.projectsMap = {
        selector: ".projects-google-map",
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var mapstyle,
                    that = $(this),
                    smallMap = that.parent().hasClass('small-projects-map'),
                    mapzoom = (smallMap) ? 1 : 2,
                    maplat = that.data("map-center-lat"),
                    maplong = that.data("map-center-long"),
                    pinlatlong = that.data("latlong"),
                    pinimage = that.data("pin-image"),
                    pinprotectedimage = that.data("pin-protected-image");

                if ($(window).width() >= 1900) {
                    mapzoom = (smallMap) ? 2 : 3;
                }

                mapstyle = [
                    {
                        "featureType": "all",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ff0000"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#444444"
                            },
                            {
                                "weight": "0.4"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#444444"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2d2d2d"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#434343"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#454545"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#151515"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ];
                var centerlatLng = new google.maps.LatLng(maplat, maplong), mapOptions = {
                    center: centerlatLng,
                    styles: mapstyle,
                    zoom: mapzoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: !1,
                    panControl: !1,
                    zoomControl: !1,
                    mapTypeControl: !1,
                    scaleControl: !1,
                    streetViewControl: !1,
                    disableDefaultUI: true,
                    backgroundColor: '#151515'
                }, map = new google.maps.Map(that[0], mapOptions);
                google.maps.event.addListenerOnce(map, "tilesloaded", function () {
                    // Create the DIV to hold the control and call the ZoomControl() constructor
                    // passing in this DIV.
                    var zoomControlDiv = document.createElement('div');
                    var zoomControl = new ZoomControl(zoomControlDiv, map);

                    zoomControlDiv.index = 1;
                    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(zoomControlDiv);

                    if (pinimage.length > 0) {
                        var pinimageLoad = new Image();

                        pinimageLoad.src = pinimage, $(pinimageLoad).load(function() {
                            base.setMarkers(map, pinlatlong, pinimage, pinprotectedimage);
                        });
                    } else {
                        base.setMarkers(map, pinlatlong, pinimage, pinprotectedimage);
                    }
                });

                /**
                 * The ZoomControl adds +/- button for the map
                 */
                function ZoomControl(controlDiv, map) {

                    // Creating divs & styles for custom zoom control
                    controlDiv.style.padding = '15px';

                    // Set CSS for the control wrapper
                    var controlWrapper = document.createElement('div');
                    controlWrapper.className = 'zoom-control-wrap';
                    controlDiv.appendChild(controlWrapper);

                    // Set CSS for the zoomIn
                    var zoomInButton = document.createElement('div'),
                        zoomInSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve"> <rect x="10" y="17" fill="#060808" width="16" height="2"/> <rect x="17" y="10" fill="#060808" width="2" height="16"/></svg>';
                    zoomInButton.className = 'zoom-control zoom-in';
                    zoomInButton.innerHTML = zoomInSVG;
                    /* Change this to be the .png image you want to use */
                    //zoomInButton.style.backgroundImage = 'url("http://placehold.it/32/00ff00")';
                    controlWrapper.appendChild(zoomInButton);

                    // Set CSS for the zoomOut
                    var zoomOutButton = document.createElement('div'),
                        zoomOutSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve"> <rect x="10" y="17" fill="#060808" width="16" height="2"/></svg>';
                    zoomOutButton.className = 'zoom-control zoom-out';
                    zoomOutButton.innerHTML = zoomOutSVG;
                    /* Change this to be the .png image you want to use */
                    //zoomOutButton.style.backgroundImage = 'url("http://placehold.it/32/0000ff")';
                    controlWrapper.appendChild(zoomOutButton);

                    // Setup the click event listener - zoomIn
                    google.maps.event.addDomListener(zoomInButton, 'click', function () {
                        map.setZoom(map.getZoom() + 1);
                    });

                    // Setup the click event listener - zoomOut
                    google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                        map.setZoom(map.getZoom() - 1);
                    });
                };
            });
        },
        setMarkers: function (map, pinlatlong, pinimage, pinprotectedimage) {
            function showPin(i) {
                var latlong_array = pinlatlong[i].lat_long.split(","),
                    smallMap = $('.projects-google-map').parent().hasClass('small-projects-map'),
                    markerPinIcon = {
                        url: (pinlatlong[i].link == '') ? pinprotectedimage : pinimage, // url
                        scaledSize: (smallMap && win.width() < 1900) ? new google.maps.Size(13, 25) : new google.maps.Size(36, 51), // scaled size
                    },
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latlong_array[0], latlong_array[1]),
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: (pinlatlong[i].link == '') ? 'Protected project marker' : 'Open project marker',
                        icon: markerPinIcon,
                        optimized: !1,
                        zIndex: (pinlatlong[i].link == '') ? 10 : 100
                    }),
                    contentString = '<div class="marker-info-win project-marker-info"><a href="' + pinlatlong[i].link + '" target="_blank"><img src="' + pinlatlong[i].image + '" alt="' + pinlatlong[i].title + '"/></a><div class="marker-inner-win clearfix"><a href="' + pinlatlong[i].link + '" target="_blank"><h5 class="marker-heading">' + pinlatlong[i].title + '</h5></a><a class="project-marker-link" href="' + pinlatlong[i].link + '" target="_blank"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px" height="7px" viewBox="0 0 35 7" enable-background="new 0 0 841.89 595.281" xml:space="preserve"><circle fill="#221F1F" cx="3.5" cy="3.5" r="3.5"/><circle fill="#221F1F" cx="17.5" cy="3.5" r="3.5"/><circle fill="#221F1F" cx="31.5" cy="3.5" r="3.5"/></svg></a></div></div>',
                    infowindow = (pinlatlong[i].link == '') ?
                        new InfoBox({
                            closeBoxURL: "",
                        }) : new InfoBox({
                            alignBottom: !0,
                            content: contentString,
                            disableAutoPan: !1,
                            maxWidth: 380,
                            closeBoxMargin: "10px 10px 10px 10px",
                            closeBoxURL: "",
                            pixelOffset: (smallMap) ? new google.maps.Size(-95, -46) : new google.maps.Size(-190, -46),
                            zIndex: null,
                            infoBoxClearance: new google.maps.Size(1, 1)
                        });
                infoWindows.push(infowindow), google.maps.event.addListener(marker, "click", function (marker, i) {
                    return function () {
                        for (var j = 0; j < infoWindows.length; j++) {
                            infoWindows[j].close();
                        }

                        infoWindows[i].open(map, this);
                    };
                }(marker, i)), google.maps.event.addListener(map, "click", function () {
                    for (var j = 0; j < infoWindows.length; j++) {
                        infoWindows[j].close();
                    }
                });
            }

            for (var infoWindows = [], i = 0; i + 1 <= pinlatlong.length; i++) setTimeout(showPin, 250 * i, i);
        }
    };
}(jQuery, this, _);
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
!function ($, window, _) {
    window.SITE.reverseAnimations = {
        start: function(container) {
            // console.log(AnimationsArray);
            // console.log(container);
            for (var out = _.difference(AnimationsArray, container), i = 0; i < out.length; ++i) out[i].progress() > 0 && (out[i].timeScale(1.6).reverse(),
                $(".mobile-toggle").data("toggled", !1), $("#quick_search").data("toggled", !1));
        }
    };
}(jQuery, this, _);
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
!function ($, window, _) {
    window.SITE.smoothScroll = {
        selector: ".smooth-scroll",
        init: function() {
            smoothScroll();
        }
    };
}(jQuery, this, _);
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