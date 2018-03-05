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