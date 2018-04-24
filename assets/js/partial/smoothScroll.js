var smoothScrollOptions = {
    animationType 		: 'linear',
    speed 				: 500,
    stepAmount 			: 250,
    type 				: 'wheel'
};
!function ($, window) {
    window.APP.smoothScroll = {
        selector: 'html,body',
        events: [EVENT_KEY_DOCUMENT_READY],
        init: function () {
            var base = this, container = $(base.selector);
            if (typeof $.fn.smoothScroll === "function") {
                container.smoothScroll(smoothScrollOptions);
            }
        }
    };
}(jQuery, this);
