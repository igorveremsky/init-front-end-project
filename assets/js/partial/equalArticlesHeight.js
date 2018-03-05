!function($, window, _) {
    window.SITE.equalArticlesHeight = {
        selector: ".blog-section article",
        init: function() {
            var emSize = parseFloat($("body").css("font-size"));
            if (win.width() > emSize*40.063) {
                var articleInRow = (win.width() > emSize * 64.063) ? 4 : 2;
                var base = this, container = $(base.selector), maxArticleRowHeight = 0,
                    textLineHeight = parseFloat(container.find('.post-content p').css('line-height')),
                    articleCount = container.length;

                container.each(function (i) {
                    var trueIndex = i + 1;
                    //console.log('-------rowIndex='+i+'----------');
                    var articleWrap = $(this), articleHeight = articleWrap.height();
                    if (articleHeight > maxArticleRowHeight) maxArticleRowHeight = articleHeight;

                    if (trueIndex % articleInRow == 0 || trueIndex == articleCount) {
                        //console.log('-------maxRowHeight='+maxArticleRowHeight+'----------');
                        //console.log('-------rowIndex=' + trueIndex + '----------');
                        for (var j = trueIndex - articleInRow + (trueIndex % articleInRow); j < trueIndex; j++) {
                            //console.log('-------j=' + j + '----------');
                            var currentArticle = $('.blog-section article:eq(' + j + ')'),
                                currentArticleHeight = currentArticle.height(),
                                articleThumbHeight = currentArticle.children('figure').outerHeight(true),
                                articleHeaderHeight = currentArticle.children('header').outerHeight(true),
                                articleLinkHeight = currentArticle.children('a').outerHeight(true),
                                articleText = currentArticle.find('.post-content p'),
                                articleTextMargin = articleText.outerHeight(true) - articleText.outerHeight();
                            //console.log(currentArticleHeight);

                            if (currentArticleHeight !== maxArticleRowHeight) {
                                var textNewHeightPx = maxArticleRowHeight - articleTextMargin - articleThumbHeight - articleHeaderHeight - articleLinkHeight,
                                    textLineCount = parseInt(textNewHeightPx / textLineHeight),
                                    textNewHeightEm = textLineCount * 1.6;

                                //console.log(textNewHeightPx, textLineCount, textNewHeightEm);

                                /*
                                var textNewMargin = maxArticleRowHeight - $(this).height();

                                var rect = $(this)[0].getBoundingClientRect();

                                var newArticleHeight;

                                if (rect.height) {
                                    // `width` is available for IE9+
                                    newArticleHeight = rect.height;
                                } else {
                                    // Calculate width for IE8 and below
                                    newArticleHeight = rect.top - rect.bottom;
                                }

                                console.log(textNewMargin, newArticleHeight, rect.height);
                                */
                                //console.log(maxArticleRowHeight);
                                articleText.height(textNewHeightEm + 'em').css('-webkit-line-clamp', textLineCount.toString());
                                currentArticle.height(maxArticleRowHeight);
                            }
                        }
                        maxArticleRowHeight = 0;
                    }
                });
            }
        }
    };
}(jQuery, this, _);