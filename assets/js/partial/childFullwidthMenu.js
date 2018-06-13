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