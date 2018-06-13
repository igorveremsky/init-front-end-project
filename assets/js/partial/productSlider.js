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