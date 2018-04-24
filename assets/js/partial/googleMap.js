!function ($, window) {
    window.APP.googleMap = {
        selector: ".google-map",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this),
                    mapcolor = that.data("map-style-color"),
                    mapislight = (that.data("map-is-light") != null),
                    mapzoom = that.data("map-zoom"),
                    maplat = that.data("map-center-lat"),
                    maplong = that.data("map-center-long"),
                    pinlatlong = that.data("latlong"),
                    pinimage = that.data("pin-image");

                var mapstyle = [
                    {
                        featureType: "all",
                        stylers: [
                            {
                                invert_lightness: (!mapislight)
                            },
                            {
                                saturation: -30
                            }
                        ]
                    },
                    {
                        featureType: "road",
                        stylers: [
                            {
                                color: (mapcolor) ? mapcolor : "#0000b0"
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
                    fullscreenControl: !1
                }, map = new google.maps.Map(that[0], mapOptions);
                google.maps.event.addListenerOnce(map, "tilesloaded", function () {
                    if (pinimage.length > 0) {
                        var pinimageLoad = new Image();
                        pinimageLoad.src = pinimage, $(pinimageLoad).on('load', function () {
                            base.setMarkers(map, pinlatlong, pinimage);
                        });
                    }
                });
            });
        },
        setMarkers: function (map, pinlatlong, pinimage) {
            function showPin(i) {
                var latlong_array = pinlatlong[i].lat_long.split(","),
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latlong_array[0], latlong_array[1]),
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: pinimage,
                        optimized: !1
                    });

                var contentString = (pinlatlong[i].hasOwnProperty('content') && pinlatlong[i].content) ? '<div class="marker-info-wrap">' + pinlatlong[i].content + '</div>' : null;
                if (typeof InfoBox !== 'undefined' && contentString) {
                    var infowindow = new InfoBox({
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

                    infoWindows.push(infowindow),
                        google.maps.event.addListener(marker, "click", function (marker, i) {
                            return function () {
                                infoWindows[i].open(map, this);
                            };
                        }(marker, i));
                }
            }

            for (var infoWindows = [], i = 0; i + 1 <= pinlatlong.length; i++) setTimeout(showPin, 250 * i, i);
        }
    };
}(jQuery, this);