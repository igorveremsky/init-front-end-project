var isScrollBar = false;

$(document).ready(function () {

    var sectionAnchors = ['home', 'sportsbook', 'start-business', 'clients-and-partners', 'meeting', 'career', 'offices', 'footer'];

    $('#fullpage').fullpage({
        anchors: sectionAnchors,
        menu: '#menu',
        //scrollOverflow: true,
        scrollBar: false,
        touchSensitivity: 15,
        recordHistory: false,
        verticalCentered: false,
        responsiveWidth: 600,

        afterResponsive: function(isResponsive){
            isScrollBar = isResponsive;
        }
    });

    $('body').addClass('loaded');

    (function () {
        var body = document.body;
        var burgerMenu = document.getElementsByClassName('b-menu')[0];
        var burgerContain = document.getElementsByClassName('b-container')[0];
        var burgerNav = document.getElementsByClassName('b-nav')[0];

        burgerMenu.addEventListener('click', function toggleClasses() {
            [body, burgerContain, burgerNav].forEach(function (el) {
                el.classList.toggle('open');
            });
        }, false);

        burgerNav.addEventListener('click', function toggleClasses() {
            [body, burgerContain, burgerNav].forEach(function (el) {
                el.classList.toggle('open');
            });
        }, false);

        $('.send-pop-up-form').click(function (e) {
            e.preventDefault();
            $('#send-request-form').trigger('click');
        });

        $('.pop-up-form').submit(function (e) {
            e.preventDefault();
            var form = $(this);
            $.ajax({
                type: 'POST',
                url: themeDirectory + '/send.php',
                data: form.serialize(), // serializes the form's elements.
                success: function(data) {
                    form.html('<p>Thanks for your reply</p>');
                    //$('.pop-up-form').html(data);
                    //alert(data); // show response from the php script.
                }
            });
        });

    })();
});
//adding the action to the button
$(document).on('click', '#moveUp', function () {
    $.fn.fullpage.moveSectionUp();
});

$(document).on('click', '#moveDown', function () {
    $.fn.fullpage.moveSectionDown();
});

$(document).on('click touchstart', '.pop-up-overlay, .pop-up-close', function () {
    $('.pop-up').attr('data-opened', 'false');

    if ($('html').hasClass('fp-enabled')) {
        if (isScrollBar) {
            $('body').css({
                'overflow': 'auto'
            });
        }

        $.fn.fullpage.setAllowScrolling(true);
    }
});

$(document).on('click', '.open-pop-up-link', function () {
    var popUpType = $(this).data('pop-up-type');
    showPopUp(popUpType);
/*

    if (popUpType === 'book-meeting')
        changeMeetingPopUpData($(this));
*/

    if (popUpType === 'benefit')
        changeBenefitPopUpData($(this));

    if (popUpType === 'client')
        changeClientPopUpData($(this));

});

function showPopUp(popUpType) {
    if ($('html').hasClass('fp-enabled')) {
        $.fn.fullpage.setAllowScrolling(false);

        $('body').css({
            'overflow': 'hidden'
        });
    }

    var popUpDom = $('.pop-up-'+popUpType);
    if (popUpDom.length) {
        var popUpContent = $('.pop-up-content');

        $('.pop-up-content-inner').hide();
        popUpDom.show();
        $('.pop-up').attr('data-opened', 'true');
        //console.log(popUpDom.outerHeight(), $(window).height());
        popUpContent.toggleClass('pop-up-content-center', popUpDom.outerHeight() < $(window).height());
    }
}

function changeMeetingPopUpData(btnDom) {
    var img = btnDom.data('meeting-img');
    var title = btnDom.data('meeting-title');
    var text = btnDom.data('meeting-text');
    var date = btnDom.data('meeting-date');
    var link = btnDom.data('meeting-link');

    if (img) {
        $('.meeting-img').attr('src', img);
    } else {
        $('.meeting-img').hide();
    }

    if (title) {
        $('.meeting-title').html(title);
        $('.meeting-title-input').val(title);
    } else {
        $('.meeting-title').hide();
    }

    if (text) {
        $('.meeting-text').html(text);
    } else {
        $('.meeting-text').hide();
    }

    if (date) {
        $('.meeting-date span').html(date);
    } else {
        $('.meeting-date').hide();
    }

    if (link) {
        $('.meeting-details-text a').html(link).attr('href', '//'+link);
    } else {
        $('.meeting-details-text').hide();
    }
}

function changeBenefitPopUpData(btnDom) {
    var svg = btnDom.html();
    var title = btnDom.find('span').html().replace('<br>', ' ');
    var text = btnDom.data('benefit-text');

    $('.benefit-img-wrap').html(svg);
    $('.benefit-title').html(title);
    $('.benefit-text').html(text);
}

function changeClientPopUpData(btnDom) {
    var svg = btnDom.html();
    var title = btnDom.find('span').html().replace('<br>', ' ');
    var text = btnDom.data('client-text');
    var link = btnDom.data('client-link');
    var quote = btnDom.data('client-quote');

    $('.client-img-wrap').html(svg);
    $('.client-title').html(title);
    $('.client-text').html(text);

    if (link) {
        $('.client-link').show().html(link).attr('href', '//' + link);
    } else {
        $('.client-link').hide();
    }

    if (quote) {
        $('.client-quote').show().html(quote);
    } else {
        $('.client-quote').hide();
    }
}

var clientSliderDataJson = [];
var clientSlideActive = 1;

$(document).ready(function () {
    if (clientSliderIndexArray.length) {
        $.each(clientSliderIndexArray, function (index, clientSliderIndex) {
            var clientBtnDom = $('.client-logo').eq(clientSliderIndex - 1).find('.client-logo-link');
            var clientSliderInfo = {
                "quote-text": clientBtnDom.data('client-quote'),
                "svg": clientBtnDom.html()
            };
            //console.log(clientBtnDom, clientSliderIndex);
            clientSliderDataJson.push(clientSliderInfo)
        });

        showClientInfo(clientSlideActive);

        if (clientSliderIndexArray.length > 1) {
            setInterval(function () {
                //console.log(clientSlideActive);
                clientSlideActive++;
                clientSlideActive = (clientSlideActive <= clientSliderIndexArray.length) ? clientSlideActive : 1;

                //console.log(clientSlideActive);
                showClientInfo(clientSlideActive);
            }, 10000);
        }
    }
});

//console.log(clientSliderDataJson);

function showClientInfo(clientShowIndex) {
    var clientSliderDom = $('.client-slider');
    var clientInfo = clientSliderDataJson[clientShowIndex-1];

    //console.log(clientInfo, clientSliderDataJson);

    clientSliderDom.animate({
        opacity: "toggle"
    }, 500, 'easeInOutCubic', function() {
        clientSliderDom.find('.quote-text').html('"'+clientInfo['quote-text']+'"');
        clientSliderDom.find('.quote-client-logo').html(clientInfo['svg']);

        clientSliderDom.animate({
            opacity: "toggle"
        }, 500, 'easeInOutCubic');
    });
}
