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