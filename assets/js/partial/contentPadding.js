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