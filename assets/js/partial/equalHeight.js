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