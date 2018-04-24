!function($, window) {
    window.APP.mobileMenu = {
        selector: ".mobile-menu-toggle",
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function() {
            var base = this, container = $(base.selector), mobileMenuDom = $('.mobile-menu-wrapper');
            container.on("click", function() {
                return (mobileMenuDom.toggleClass('is-active') && container.toggleClass('is-active'));
            });
        }
    };
}(jQuery, this);