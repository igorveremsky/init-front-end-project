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