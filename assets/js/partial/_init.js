var $doc = $(document), win = $(window), Modernizr = window.Modernizr, AnimationsArray = [];

!function($, window, _) {
    window.SITE = {
        init: function() {
            {
                var self = this, content = $("#wrapper"); pl = content.find(">.preloader");
                    /*before_hide_preloader_methods = [
                        'fullHeightContent',
                        'equalHeights',
                        'masonry'
                    ];*/
            }
            content.waitForImages({
                finished: function(loaded, count, success) {
                    $('#wrapper').css('padding-bottom', $('footer').innerHeight());
                    TweenMax.to(pl, 1, {
                        autoAlpha: 0,
                        ease: Quart.easeOut,
                        onComplete: function () {
                            pl.css("display", "none");
                        }
                    });
                    /*
                     var big_masonry_block_h = $('.thb-portfolio').find('article').eq(0).height();
                     var medium_masonry_block_h = $('.thb-portfolio').find('article').eq(2).height();
                     //alert(medium_masonry_block_h);
                     var text_article = $('.simple-text-article');
                     text_article.css('height',big_masonry_block_h - medium_masonry_block_h+'px');
                     var right_height = text_article.height() + medium_masonry_block_h + $('.thb-portfolio').find('article').eq(5).height() + $('.thb-portfolio').find('article').eq(10).height();
                     var left_height =big_masonry_block_h + $('.thb-portfolio').find('article').eq(3).height() + $('.thb-portfolio').find('article').eq(6).height()+ $('.thb-portfolio').find('article').eq(8).height();
                     console.log(right_height);
                     console.log(left_height);*/

                    for (var obj in self) if (self.hasOwnProperty(obj)) {
                        var _method = self[obj];
                        (void 0 !== _method.selector && void 0 !== _method.init && $(_method.selector).length > 0 && _method.init());
                    }
                },
                /*each: function(loaded, count, success) {
                    if(loaded==13) {
                        for (var obj in self) if (self.hasOwnProperty(obj)) {
                            var _method = self[obj];
                            before_hide_preloader_methods.indexOf(obj) !== -1 && void 0 !== _method.selector && void 0 !== _method.init && $(_method.selector).length > 0 && _method.init();
                        }
                    }
                    if(loaded==14) {
                        TweenMax.to(pl, 1, {
                            autoAlpha: 0,
                            ease: Quart.easeOut,
                            onComplete: function () {
                                pl.css("display", "none");
                            }
                        });
                    }
                },*/
                waitForAll: true
            });
        }
    };

    win.resize(function() {
        /*window.SITE.equalArticlesHeight.init();*/
        $('#wrapper').css('padding-bottom', $('footer').innerHeight());
    });
    win.scroll(function() {

    });

    $doc.ready(function() {
        window.SITE.init();
    });
}(jQuery, this, _);