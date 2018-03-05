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