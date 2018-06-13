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