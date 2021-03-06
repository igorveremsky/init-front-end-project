'use strict';
var EVENT_KEY_WINDOW_RESIZE = 'window_resize',
    EVENT_KEY_WINDOW_SCROLL = 'window_scroll',
    EVENT_KEY_WINDOW_SCROLL_END = 'window_scroll_end',
    EVENT_KEY_DOCUMENT_READY = 'document_ready';

// Animation variables
// Duration
var animationDuration = .4;

// Timing Functions
var animationCountEase = Power0.easeNone,
    animationFadeEase = Power0.easeNone,
    animationTransformEase = Sine.easeInOut,
    animationColorEase = Sine.easeInOut;

// Timeline variables
var preloadTimeline = new TimelineLite({
        // paused: 1
        // autoRemoveChildren: 1
    }),
    viewportTimeline = new TimelineLite({
        // paused: 1
        // autoRemoveChildren: 1,
        /*onComplete: function () {
            viewportTimeline.clear();
        },*/
        onUpdate: function () {
            // if (!viewportTimeline.isActive()) {
            //     viewportTimeline.delay(.5);
            // }
            // console.log('add animation');
            // viewportTimeline.clear();
        }
    });

var $doc = $(document),
    $win = $(window),
    Modernizr = window.Modernizr;

function initAppEvents(eventKey) {
    var appEvents = window.APP;
    for (var appEvent in appEvents) if (appEvents.hasOwnProperty(appEvent)) {
        var _method = appEvents[appEvent];
        (_method.events.indexOf(eventKey) !== -1 && void 0 !== _method.selector && void 0 !== _method.init && $(_method.selector).length > 0 && _method.init());
    }
}

// extension:
$.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function(){
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
};

!function($, window) {
    window.APP = [];
    $win.resize(function() {
        initAppEvents(EVENT_KEY_WINDOW_RESIZE);
    });
    $win.scroll(function() {
        initAppEvents(EVENT_KEY_WINDOW_SCROLL);
    });
    $doc.ready(function() {
        initAppEvents(EVENT_KEY_DOCUMENT_READY);
    });
    $win.scrollEnd(function(){
        initAppEvents(EVENT_KEY_WINDOW_SCROLL_END);
    }, 500);
}(jQuery, this);
var animationFrameDuration = .01,
    checkLoadTime = false;

!function ($, window) {
    window.APP.preloader = {
        selector: ".preloader",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector),
                svgDom = container.find('.preloader-wrap svg'),
                svgPathDom = svgDom.find('path'),
                svgPathCount = parseInt(svgPathDom.css('stroke-dasharray'));

            var loadingStart = Date.now();

            $('main').waitForImages(function () {
                //alert('All images have loaded.');
                var animationFrameDuration = (checkLoadTime) ? (Date.now() - loadingStart) / 1000 : animationFrameDuration;

                preloadTimeline
                    .to(svgPathDom, animationFrameDuration, {
                        'stroke-dashoffset': 0,
                        ease: animationCountEase
                    })
                    .to(svgPathDom, animationDuration, {
                        'fill': '#000',
                        ease: animationColorEase
                    })
                    .to(container, animationDuration, {
                        autoAlpha: 0,
                        y: '-100%',
                        ease: animationTransformEase
                    })
                    .fromTo($('main'), animationDuration, {
                        y: $win.height(),
                        ease: animationTransformEase
                    }, {
                        y: 0
                    }, "+=" + animationDuration / 2)
                    .add(viewportTimeline, "-=" + animationBlockDelay)
                    .fromTo($('header'), animationDuration * 2, {
                        y: '-100%',
                        ease: animationTransformEase
                    }, {
                        y: '0%'
                    }, "-=" + viewportTimeline.duration());
            }, function (loaded, count, success) {
                var loadPercent = loaded / count,
                    animationFrameDuration = (checkLoadTime) ? (Date.now() - loadingStart) / 1000 : animationFrameDuration,
                    svgPathLoadCount = loadPercent * svgPathCount;

                loadingStart = Date.now();

                preloadTimeline.to(svgPathDom, animationFrameDuration, {
                    'stroke-dashoffset': -svgPathCount + svgPathLoadCount,
                    ease: animationCountEase
                });
            });
        }
    };
}(jQuery, this);
var animationFullwidthMenuTimeline = new TimelineLite({
    paused: 1,
    onComplete: function () {
        window.APP.viewportAnimations.init();
    },
    onReverseComplete: function () {
        $(window.APP.childFullwidthMenu.selector).find('ul').css('display', 'none');
    }
});

!function ($, window) {
    window.APP.childFullwidthMenu = {
        selector: "header nav > ul > li.child-fullwidth",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector), otherItems = $("header nav > ul > li:not(.child-fullwidth)"),
                fullwidthHeaderDom = $('header .down'), childs = container.find('ul'), header = $('header');

            animationFullwidthMenuTimeline
                .set(fullwidthHeaderDom, {
                    display: 'block'
                })
                .set(header.find('.up'), {
                    backgroundColor: '#000'
                })
                .to(fullwidthHeaderDom, animationDuration, {
                    y: '0%',
                    ease: animationTransformEase
                })
                .to(childs, animationDuration, {
                    autoAlpha: 1,
                    ease: animationFadeEase
                }, "-=" + animationDuration);

            container.mouseenter(function () {
                base.show($(this));
            });

            otherItems.mouseenter(function () {
                base.hide();
            });

            header.mouseleave(function () {
                base.hide();
            });
        },
        show: function (itemDom) {
            var base = this, container = $(base.selector),
                childs = container.find('ul'),
                child = itemDom.find('ul');

            var showTimeline = new TimelineLite();

            if (animationFullwidthMenuTimeline.progress() > 0 && child.css('display') === 'none') {
                showTimeline
                    /*.to(childs, animationDuration, {
                        autoAlpha: 0,
                        ease: animationFadeEase
                    })*/
                    .set(childs, {
                        display: 'none'
                    })
                    /*.to(child, animationDuration, {
                        autoAlpha: 1,
                        ease: animationFadeEase
                    })*/;
            }

            showTimeline.set(child, {
                display: ((child.hasClass('columns-2')) ? 'flex' : 'block')
            });

            animationFullwidthMenuTimeline.play();
        },
        hide: function () {
            animationFullwidthMenuTimeline.reverse();
        }
    };
}(jQuery, this);
!function ($, window) {
    window.APP.contentHeaderPadding = {
        selector: "main",
        events: [EVENT_KEY_DOCUMENT_READY, EVENT_KEY_WINDOW_RESIZE],
        init: function () {
            var base = this, container = $(base.selector), sectionIncludeHeader = $('section.banner-intro'),
                headerDom = $('header'), headerHeight = headerDom.find('.up').height();
            container.each(function () {
                var that = $(this), first = that.children().first();
                if (!first.is(sectionIncludeHeader)) {
                    var paddingDom = (first.hasClass('fullheight')) ? first : that;
                    paddingDom.css('padding-top', headerHeight);
                    headerDom.addClass('fixed');
                }
            });
        }
    };
}(jQuery, this);
!function ($, window) {
    window.APP.googleMap = {
        selector: ".google-map",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this),
                    mapzoom = that.data("map-zoom"),
                    maplat = that.data("map-center-lat"),
                    maplong = that.data("map-center-long"),
                    pinlatlong = that.data("latlong"),
                    pinimage = that.data("pin-image");
                /**
                 * MapTypeStyle object specification
                 *
                 * The MapTypeStyle is a collection of selectors and stylers that define how the map should be styled. Selectors specify the map features and/or elements that should be affected, and stylers specify how those features and elements should be modified. For details, see the style reference (https://developers.google.com/maps/documentation/javascript/style-reference?hl=ru#style-elements).
                 *
                 * @param elementType {string} - The element to which a styler should be applied. An element is a visual aspect of a feature on the map. Example: a label, an icon, the stroke or fill applied to the geometry, and more. Optional. If elementType is not specified, the value is assumed to be 'all'. For details of usage and allowed values, see the style reference (https://developers.google.com/maps/documentation/javascript/style-reference?hl=ru#style-elements).
                 * @param featureType {string} - The feature, or group of features, to which a styler should be applied. Optional. If featureType is not specified, the value is assumed to be 'all'. For details of usage and allowed values, see the style reference (https://developers.google.com/maps/documentation/javascript/style-reference?hl=ru#style-features).
                 * @param stylers {Array<Object>} - The style rules to apply to the selected map features and elements. The rules are applied in the order that you specify in this array. For guidelines on usage and allowed values, see the style reference(https://developers.google.com/maps/documentation/javascript/style-reference?hl=ru#stylers).
                 */
                /**
                 * featureType specifications
                 *
                 * Features, or feature types, are geographic characteristics on the map, including roads, parks, bodies of water, businesses, and more.
                 * The features form a category tree, with all as the root. If you don't specify a feature, all features are selected. Specifying a feature of all has the same effect.
                 * Some features contain child features you specify using a dot notation. For example, landscape.natural or road.local. If you specify only the parent feature, such as road, the styles you specify for the parent apply to all its children, such as road.local and road.highway.
                 * Note that parent features may include some elements that are not included in all of their child features.
                 *
                 * The following features are available:
                 * all (default) - selects all features.
                 * administrative - selects all administrative areas. Styling affects only the labels of administrative areas, not the geographical borders or fill.
                 * * administrative.country - selects countries.
                 * * administrative.land_parcel - selects land parcels.
                 * * administrative.locality - selects localities.
                 * * administrative.neighborhood - selects neighborhoods.
                 * * administrative.province - selects provinces.
                 * landscape - selects all landscapes.
                 * * landscape.man_made - selects structures built by humans.
                 * * landscape.natural - selects natural features.
                 * * * landscape.natural.landcover - selects landcover features.
                 * * * landscape.natural.terrain - selects terrain features.
                 * poi - selects all points of interest.
                 * * poi.attraction - selects tourist attractions.
                 * * poi.business - selects businesses.
                 * * poi.government - selects government buildings.
                 * * poi.medical - selects emergency services, including hospitals, pharmacies, police, doctors, and others.
                 * * poi.park - selects parks.
                 * * poi.place_of_worship - selects places of worship, including churches, temples, mosques, and others.
                 * * poi.school - selects schools.
                 * * poi.sports_complex - selects sports complexes.
                 * road - selects all roads.
                 * * road.arterial - selects arterial roads.
                 * * road.highway - selects highways.
                 * * * road.highway.controlled_access - selects highways with controlled access.
                 * * road.local - selects local roads.
                 * transit - selects all transit stations and lines.
                 * * transit.line - selects transit lines.
                 * * transit.station - selects all transit stations.
                 * * * transit.station.airport - selects airports.
                 * * * transit.station.bus - selects bus stops.
                 * * * transit.station.rail - selects rail stations.
                 * water - selects bodies of water.
                 */
                /**
                 * elementType specifications
                 *
                 * Elements are subdivisions of a feature. A road, for example, consists of the graphical line (the geometry) on the map, and also the text denoting its name (a label).
                 *
                 * The following elements are available, but note that a specific feature may support none, some, or all, of the elements:
                 * all (default) - selects all elements of the specified feature.
                 * geometry - selects all geometric elements of the specified feature.
                 * * geometry.fill - selects only the fill of the feature's geometry.
                 * * geometry.stroke - selects only the stroke of the feature's geometry.
                 * labels - selects the textual labels associated with the specified feature.
                 * * labels.icon - selects only the icon displayed within the feature's label.
                 * * labels.text - selects only the text of the label.
                 * * * labels.text.fill - selects only the fill of the label. The fill of a label is typically rendered as a colored outline that surrounds the label text.
                 * * * labels.text.stroke - selects only the stroke of the label's text.
                 */
                /**
                 * stylers specifications
                 *
                 * Stylers are formatting options that you can apply to map features and elements.
                 *
                 * The following style options are supported:
                 * hue (an RGB hex string of format #RRGGBB) - indicates the basic color.
                 * * Note: This option sets the hue while keeping the saturation and lightness specified in the default Google style (or in other style options you define on the map). The resulting color is relative to the style of the base map. If Google makes any changes to the base map style, the changes affect your map's features styled with hue. It's better to use the absolute color styler if you can.
                 * lightness (a floating point value between -100 and 100) - indicates the percentage change in brightness of the element. Negative values increase darkness (where -100 specifies black) while positive values increase brightness (where +100 specifies white).
                 * * Note: This option sets the lightness while keeping the saturation and hue specified in the default Google style (or in other style options you define on the map). The resulting color is relative to the style of the base map. If Google makes any changes to the base map style, the changes affect your map's features styled with lightness. It's better to use the absolute color styler if you can.
                 * saturation (a floating point value between -100 and 100) - indicates the percentage change in intensity of the basic color to apply to the element.
                 * * Note: This option sets the saturation while keeping the hue and lightness specified in the default Google style (or in other style options you define on the map). The resulting color is relative to the style of the base map. If Google makes any changes to the base map style, the changes affect your map's features styled with saturation. It's better to use the absolute color styler if you can.
                 * gamma (a floating point value between 0.01 and 10.0, where 1.0 applies no correction) - indicates the amount of gamma correction to apply to the element. Gamma corrections modify the lightness of colors in a non-linear fashion, while not affecting white or black values. Gamma correction is typically used to modify the contrast of multiple elements. For example, you can modify the gamma to increase or decrease the contrast between the edges and interiors of elements.
                 * * Note: This option adjusts the lightness relative to the default Google style, using a gamma curve. If Google makes any changes to the base map style, the changes affect your map's features styled with gamma. It's better to use the absolute color styler if you can.
                 * invert_lightness (boolean) - (if true) inverts the existing lightness. This is useful, for example, for quickly switching to a darker map with white text.
                 * * Note: This option simply inverts the default Google style. If Google makes any changes to the base map style, the changes affect your map's features styled with invert_lightness. It's better to use the absolute color styler if you can.
                 * visibility (on, off, or simplified) - indicates whether and how the element appears on the map. A simplified visibility removes some style features from the affected features; roads, for example, are simplified into thinner lines without outlines, while parks lose their label text but retain the label icon.
                 * color (an RGB hex string of format #RRGGBB) - sets the color of the feature.
                 * weight (an integer value, greater than or equal to zero) - sets the weight of the feature, in pixels. Setting the weight to a high value may result in clipping near tile borders.
                 *
                 * Style rules are applied in the order that you specify. Do not combine multiple operations into a single style operation. Instead, define each operation as a separate entry in the style array.
                 *
                 * Note: Order is important, as some operations are not commutative. Features and/or elements that are modified through style operations (usually) already have existing styles. The operations act on those existing styles, if present.
                 * */
                var mapstyle = [
                    /*{
                        featureType: "all",
                        stylers: [
                            {
                                invert_lightness: (!mapislight)
                            },
                            {
                                saturation: -30
                            }
                        ]
                    },*/
                    {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#e6e6e6"
                            }
                        ]
                    },
                    {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [
                            {
                                saturation: -100
                            }
                        ]
                    },
                    {
                        featureType: "landscape",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: '#333333'
                                // visibility: "off"
                            }
                        ]
                    },
                    /*{
                        featureType: "administrative",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },*/
                    {
                        featureType: "road",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#666666"
                            }
                        ]
                    },
                    {
                        featureType: "road",
                        elementType: "geometry.stroke",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "poi.park",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#595959"
                            }
                        ]
                    }
                ];

                var centerlatLng = new google.maps.LatLng(maplat, maplong),
                    /**
                     * MapOptions object specification
                     *
                     * @param backgroundColor {string} - Color used for the background of the Map div. This color will be visible when tiles have not yet loaded as the user pans. This option can only be set when the map is initialized.
                     * @param center {google.maps.LatLng} - The initial Map center. Required.
                     * @param clickableIcons {boolean} - When false, map icons are not clickable. A map icon represents a point of interest, also known as a POI. By default map icons are clickable.
                     * @param disableDefaultUI {boolean} - Enables/disables all default UI. May be overridden individually.
                     * @param disableDoubleClickZoom {boolean} - Enables/disables zoom and center on double click. Enabled by default.
                     * @param draggable {boolean} - If false, prevents the map from being dragged. Dragging is enabled by default.
                     * @param draggableCursor {string} - The name or url of the cursor to display when mousing over a draggable map. This property uses the css cursor attribute to change the icon. As with the css property, you must specify at least one fallback cursor that is not a URL. For example: draggableCursor: 'url(http://www.example.com/icon.png), auto;'.
                     * @param draggingCursor {string} - The name or url of the cursor to display when the map is being dragged. This property uses the css cursor attribute to change the icon. As with the css property, you must specify at least one fallback cursor that is not a URL. For example: draggingCursor: 'url(http://www.example.com/icon.png), auto;'.
                     * @param fullscreenControl {boolean} - The enabled/disabled state of the Fullscreen control.
                     * @param fullscreenControlOptions {google.maps.FullscreenControlOptions} - The display options for the Fullscreen control.
                     * @param heading {number} - The heading for aerial imagery in degrees measured clockwise from cardinal direction North. Headings are snapped to the nearest available angle for which imagery is available.
                     * @param keyboardShortcuts {boolean} - If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are enabled by default.
                     * @param mapTypeControl {boolean} - The initial enabled/disabled state of the Map type control.
                     * @param mapTypeControlOptions {google.maps.MapTypeControlOptions} - The initial display options for the Map type control.
                     * @param mapTypeId {google.maps.MapTypeId} - The initial Map mapTypeId. Defaults to ROADMAP.
                     * @param maxZoom {number} - The maximum zoom level which will be displayed on the map. If omitted, or set to null, the maximum zoom from the current map type is used instead. Valid values: Integers between zero, and up to the supported maximum zoom level.
                     * @param minZoom {number} - The minimum zoom level which will be displayed on the map. If omitted, or set to null, the minimum zoom from the current map type is used instead. Valid values: Integers between zero, and up to the supported maximum zoom level.
                     * @param noClear {boolean} - If true, do not clear the contents of the Map div.
                     * @param panControl {boolean} - The enabled/disabled state of the Pan control.
                     Note: The Pan control is not available in the new set of controls introduced in v3.22 of the Google Maps JavaScript API. While using v3.22 and v3.23, you can choose to use the earlier set of controls rather than the new controls, thus making the Pan control available as part of the old control set. See What's New in the v3.22 Map Controls.
                     * @param panControlOptions {google.maps.PanControlOptions} - The display options for the Pan control.
                     Note: The Pan control is not available in the new set of controls introduced in v3.22 of the Google Maps JavaScript API. While using v3.22 and v3.23, you can choose to use the earlier set of controls rather than the new controls, thus making the Pan control available as part of the old control set. See What's New in the v3.22 Map Controls.
                     * @param rotateControl {boolean} - The enabled/disabled state of the Rotate control.
                     * @param rotateControlOptions {google.maps.RotateControlOptions} - The display options for the Rotate control.
                     * @param scaleControl {boolean} - The initial enabled/disabled state of the Scale control.
                     * @param scaleControlOptions {google.maps.ScaleControlOptions} - The initial display options for the Scale control.
                     * @param scrollwheel {boolean} - If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
                     * @param signInControl {boolean} - The enabled/disabled state of the sign in control. This option only applies if signed_in=true has been passed as a URL parameter in the bootstrap request. You may want to use this option to hide the map's sign in control if you have provided another way for your users to sign in, such as the Google Sign-In button. This option does not affect the visibility of the Google avatar shown when the user is already signed in.
                     * @param streetView {google.maps.StreetViewPanorama} - A StreetViewPanorama to display when the Street View pegman is dropped on the map. If no panorama is specified, a default StreetViewPanorama will be displayed in the map's div when the pegman is dropped.
                     * @param streetViewControl {boolean} - The initial enabled/disabled state of the Street View Pegman control. This control is part of the default UI, and should be set to false when displaying a map type on which the Street View road overlay should not appear (e.g. a non-Earth map type).
                     * @param streetViewControlOptions {google.maps.StreetViewControlOptions} - The initial display options for the Street View Pegman control.
                     * @param styles {google.maps.MapTypeStyle} - Styles to apply to each of the default map types. Note that for satellite/hybrid and terrain modes, these styles will only apply to labels and geometry.
                     * @param tilt {number} - Controls the automatic switching behavior for the angle of incidence of the map. The only allowed values are 0 and 45. The value 0 causes the map to always use a 0° overhead view regardless of the zoom level and viewport. The value 45 causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the current zoom level and viewport, and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 45° imagery is only available for satellite and hybrid map types, within some locations, and at some zoom levels. Note: getTilt returns the current tilt angle, not the value specified by this option. Because getTilt and this option refer to different things, do not bind() the tilt property; doing so may yield unpredictable effects.
                     * @param zoom {number} - The initial Map zoom level. Required. Valid values: Integers between zero, and up to the supported maximum zoom level.
                     * @param zoomControl {boolean} - The enabled/disabled state of the Zoom control.
                     * @param zoomControlOptions {google.maps.ZoomControlOptions} - The display options for the Zoom control.
                     */
                    mapOptions = {
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
var mobilemenuTimeline = new TimelineLite({
        paused: 1
    }),
    mobileHeaderDom = $('header .up'),
    mobileMenuDom = $('.mobile-menu-wrapper');

mobilemenuTimeline
    .set($('header'), {
        position: 'fixed'
    })
    .to(mobileHeaderDom, animationDuration, {
        backgroundColor: '#000',
        ease: animationColorEase
    })
    .fromTo(mobileMenuDom, animationDuration, {
        autoAlpha: 0,
        y: "-100%",
        ease: animationTransformEase
    }, {
        autoAlpha: 1,
        y: "0%"
    }, "-="+animationDuration);
!function ($, window) {
    window.APP.mobileMenu = {
        selector: ".mobile-menu-toggle",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            container.on("click", function () {
                container.toggleClass('is-active');

                if (container.hasClass('is-active')) {
                    mobilemenuTimeline.play();
                } else {
                    mobilemenuTimeline.reverse();
                }
            });
        }
    };
}(jQuery, this);
!function ($, window) {
    window.APP.productSlider = {
        selector: ".block-product-slider",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this),
                    click = that.find('.thumbnails .thumbnail'),
                    prev = that.find('.thumbnails .arrow-prev'),
                    next = that.find('.thumbnails .arrow-next');

                click.click(function (e) {
                    var clicked = $(this);
                    e.preventDefault();
                    if (!clicked.hasClass('active')) {
                        base.set(clicked.index(), that);
                    }
                });

                prev.click(function (e) {
                    var activeIndex = that.find('.thumbnails .thumbnail.active').index();
                    e.preventDefault();
                    base.set((activeIndex - 1), that);
                });

                next.click(function (e) {
                    var activeIndex = that.find('.thumbnails .thumbnail.active').index();
                    base.set((activeIndex + 1), that);
                });
            });
        },
        set: function (index, sliderDom) {
            var currentImageDom = sliderDom.find('.current img'),
                thumbnailsDom = sliderDom.find('.thumbnails .thumbnail'),
                indexImage = (index === thumbnailsDom.length) ? 0 : ((index < 0) ? thumbnailsDom.length - 1 : index),
                thumbnailDom = thumbnailsDom.eq(indexImage),
                imageSrc = (thumbnailDom.data('img-src')) ? thumbnailDom.data('img-src') : thumbnailDom.find('img').attr('src');

            thumbnailsDom.removeClass('active');
            thumbnailDom.addClass('active');

            var sliderAnimationTimeLine = new TimelineLite();
            sliderAnimationTimeLine
                .to(currentImageDom, animationDuration, {
                    opacity: 0,
                    ease: animationFadeEase
                })
                .set(currentImageDom, {
                    src: imageSrc
                })
                .to(currentImageDom, animationDuration, {
                    opacity: 1,
                    ease: animationFadeEase
                });

            // currentImageDom.attr('src', imageSrc);
        }
    };
}(jQuery, this);
var smoothScrollOptions = {
    animationType 		: 'linear',
    speed 				: 500,
    stepAmount 			: 250,
    type 				: 'wheel'
};
!function ($, window) {
    window.APP.smoothScroll = {
        selector: 'html,body',
        events: [/*EVENT_KEY_DOCUMENT_READY*/],
        init: function () {
            var base = this, container = $(base.selector);
            if (typeof $.fn.smoothScroll === "function") {
                container.smoothScroll(smoothScrollOptions);
            }
        }
    };
}(jQuery, this);

!function ($, window) {
    window.APP.tabs = {
        selector: ".tabs",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this), open = that.find('.title-main');

                open.click(function (e) {
                    var tab = $(this).parents('.tab');
                    e.preventDefault();
                    tab.toggleClass('active');
                });
            });
        }
    };
}(jQuery, this);
var ANIMATION_KEY_OVERLAY_LEFT = 'a-o-l';
var ANIMATION_KEY_OVERLAY_BOTTOM = 'a-o-b';
var ANIMATION_KEY_APPEAR_BOTTOM = 'a-a-b';
var ANIMATION_KEY_APPEAR = 'a-a';

var ANIMATION_OVERLAY_CLASS = 'animate-overlay';
var ANIMATION_CONTENT_CLASS = 'animate-content';

// Appear variables
var appearCoordinateFrom = 50;

// Overlay variables
var animationBlockDuration = 1;
var animationBlockDelay = .1;
var overlayDuration = animationBlockDuration/2;

function animateOverlayLeft(animateDom) {
    if (animateDom.is(':empty') || animateDom.hasClass('animate')) {
        return !1;
    }

    animateDom.addClass('animate');
    var innerTagKey = (animateDom.is(':header') || animateDom.is(':text') || animateDom.is('a')) ? 'span' : 'div';
    var overlayClassKey = '.' + ANIMATION_OVERLAY_CLASS + ':first-child',
        overlayDom = animateDom.find(overlayClassKey),
        contentClassKey = '.' + ANIMATION_CONTENT_CLASS,
        contentDom = animateDom.find(contentClassKey);

    if (contentDom.length && overlayDom.length) {
        return !1;
    }

    if (!contentDom.length) {
        animateDom.html('<' + innerTagKey + ' class="' + ANIMATION_CONTENT_CLASS + '">' + animateDom.html() + '</' + innerTagKey + '>');
        contentDom = animateDom.find(contentClassKey);
    }
    if (!overlayDom.length) {
        animateDom.prepend('<' + innerTagKey + ' class="' + ANIMATION_OVERLAY_CLASS + '"></' + innerTagKey + '>');
        overlayDom = animateDom.find(overlayClassKey);
    }
    var timeline = initAnimationTimeline();
    timeline.set(animateDom, {
        autoAlpha: 1
    }).fromTo(overlayDom, overlayDuration, {
        left: '-100%',
        ease: animationTransformEase
    }, {
        left: '0%'
    }).fromTo(contentDom, overlayDuration, {
        autoAlpha: 0,
        ease: animationFadeEase
    }, {
        autoAlpha: 1
    }).to(overlayDom, overlayDuration, {
        left: '100%',
        ease: animationTransformEase
    }, '-=' + overlayDuration);
    addToViewPortTimeline(timeline);
}

function animateOverlayBottom(animateDom) {
    if (animateDom.is(':empty') || animateDom.hasClass('animate')) {
        return !1;
    }

    animateDom.addClass('animate');
    var innerTagKey = (animateDom.is(':header') || animateDom.is(':text') || animateDom.is('a')) ? 'span' : 'div';
    var overlayClassKey = '.' + ANIMATION_OVERLAY_CLASS + ':first-child',
        overlayDom = animateDom.find(overlayClassKey),
        contentClassKey = '.' + ANIMATION_CONTENT_CLASS,
        contentDom = animateDom.find(contentClassKey);

    if (contentDom.length && overlayDom.length) {
        return !1;
    }

    if (!contentDom.length) {
        animateDom.html('<' + innerTagKey + ' class="' + ANIMATION_CONTENT_CLASS + '">' + animateDom.html() + '</' + innerTagKey + '>');
        contentDom = animateDom.find(contentClassKey);
    }
    if (!overlayDom.length) {
        animateDom.prepend('<' + innerTagKey + ' class="' + ANIMATION_OVERLAY_CLASS + '"></' + innerTagKey + '>');
        overlayDom = animateDom.find(overlayClassKey);
    }
    var timeline = initAnimationTimeline();
    timeline.set(animateDom, {
        autoAlpha: 1
    }).fromTo(overlayDom, overlayDuration, {
        top: '100%',
        ease: animationTransformEase
    }, {
        top: '0%'
    }).fromTo(contentDom, overlayDuration, {
        autoAlpha: 0,
        ease: animationFadeEase
    }, {
        autoAlpha: 1
    }).to(overlayDom, overlayDuration, {
        top: '-100%',
        ease: animationTransformEase
    }, '-=' + overlayDuration);
    addToViewPortTimeline(timeline);
}

function animateAppearBottom(animateDom) {
    if (animateDom.hasClass('animate')) {
        return !1;
    }
    animateDom.addClass('animate');

    var timeline = initAnimationTimeline();
    timeline.fromTo(animateDom, animationBlockDuration, {
        autoAlpha: 0,
        y: appearCoordinateFrom,
        ease: animationTransformEase
    }, {
        autoAlpha: 1,
        y: 0
    });
    addToViewPortTimeline(timeline);
}

function animateAppear(animateDom) {
    if (animateDom.hasClass('animate')) {
        return !1;
    }
    animateDom.addClass('animate');

    var timeline = initAnimationTimeline();
    timeline.fromTo(animateDom, animationBlockDuration, {
        autoAlpha: 0,
        ease: animationFadeEase
    }, {
        autoAlpha: 1
    });

    addToViewPortTimeline(timeline);
}

function initAnimationTimeline() {
    return new TimelineLite({
        // paused: 1
    });
}

function addToViewPortTimeline(timeline) {
    var delay = (viewportTimeline.isActive()) ? "-="+(animationBlockDuration-animationBlockDelay) : "+="+animationBlockDelay;
    viewportTimeline.add(timeline, delay);
}

!function ($, window) {
    window.APP.viewportAnimations = {
        selector: ':in-viewport',
        events: [EVENT_KEY_DOCUMENT_READY, EVENT_KEY_WINDOW_SCROLL],
        init: function () {
            var base = this, container = $(base.selector);
            container.each(function () {
                var that = $(this),
                    thatJsDom = this,
                    before = window.getComputedStyle(thatJsDom, ':before'),
                    beforeContent = before.content.replace(/[\"\']/g, '');

                if (that.css('opacity') !== "0" || beforeContent === "") {
                    return;
                }

                // that.fadeIn(500);
                // console.log(that, beforeContent);
                if (beforeContent === ANIMATION_KEY_OVERLAY_LEFT) {
                    // In viewport
                    animateOverlayLeft(that);
                }
                if (beforeContent === ANIMATION_KEY_OVERLAY_BOTTOM) {
                    // In viewport
                    animateOverlayBottom(that);
                }
                if (beforeContent === ANIMATION_KEY_APPEAR_BOTTOM) {
                    // In viewport
                    animateAppearBottom(that);
                }
                if (beforeContent === ANIMATION_KEY_APPEAR) {
                    // In viewport
                    animateAppear(that);
                }
                // viewportTimeline.play();
                // viewportTimeline.play();
                // console.log(viewportAnimationTimeline);
                // viewportAnimationTimeline.kill();
            });
        }
    };
}(jQuery, this);
