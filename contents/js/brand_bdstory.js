$(function () {
    $('header').addClass('header-scrolled');

    //oneShow(), otherShow()를 위한 사전 세팅 시작 ////////////////////////////
    //1) .salady-story의 제목, article에 해당하는 모든 자식요소 투명도 0
    $('.salady-story').children().css({
        opacity: 0
    });

    //2) .title-wrap 좌측 자식요소 마진left -200, 우측 자식요소 마진right -200
    $('.salady-story .title-wrap .title').css({
        marginLeft: -300
    })
    $('.salady-story .title-wrap .des').css({
        marginRight: -300
    })

    //3) article 좌측 자식요소 마진left -200, 우측 자식요소 마진right -200
    $('.salady-story article:nth-child(even) img').css({
        marginLeft: -300
    })
    $('.salady-story article:nth-child(even) .content').css({
        marginRight: -300
    })
    $('.salady-story article:nth-child(odd) img').css({
        marginRight: -300
    })
    $('.salady-story article:nth-child(odd) .content').css({
        marginLeft: -300
    })


    //사전 세팅 끝 ////////////////////////////

    oneScrollEvt();
    changeScrollEvt();
    growScrollEvt();
    futureScrollEvt();
});

//// 구현 메모 //////////////////////////////////////////
//// 전역함수, 전역변수 모음 //////////////////////////////////////////
let winTop;
let isAnimating = false;

function oneScrollEvt() {
    let htmlHeight = $('html').height();
    let finalScrollTop = htmlHeight - $('header').height();
    let isExecuted = false;

    $(window).on('scroll', function () {
        if (isAnimating || isExecuted) return;

        isAnimating = true;
        isExecuted = true;
        
        $('html, body').animate({
            scrollTop: finalScrollTop
        }, {
            duration: 800,
            complete: function() {
                isAnimating = false;
                oneShow();
            }
        });
    });
}

function oneShow() {
    //oneScrollEvt 끝나고 콜백함수로 처음 보여져야 할 요소들
    //.titlewrap
    //좌측 요소
    $('.salady-story .title-wrap').animate({
        opacity: 1
    }, 500)
        .find('.title').animate({
            marginLeft: 0
        }, 500)
    //우측 요소
    $('.salady-story .title-wrap').animate({
        opacity: 1
    })
        .find('.des').animate({
            marginRight: 0
        }, 500);

    //start
    //좌측 요소
    $('.salady-story .start').delay(500).animate({
        opacity: 1
    }, 500)
        .find('img').delay(500).animate({
            marginLeft: 0
        }, 500)
        //우측 요소
        .parents('.start')
        .find('.content').delay(500).animate({
            marginRight: 0
        }, 500);
}









///////////여기서부터 문제////////////////////////////////


function changeScrollEvt() {
    let headerHeight = $('header').height();
    let changeScrollTop = $('.salady-story .change').offset().top - headerHeight - $(window).height() * 0.35;

    $(window).on('scroll', function () {
        winTop = $(window).scrollTop();
        if (winTop > changeScrollTop) {
            changeShow();
        }
    });
}

function changeShow() {
    if (!$('.salady-story .change').hasClass('animated')) {

        $('.salady-story .change').addClass('animated');

        $('.salady-story .change').animate({
            opacity: 1
        }, 500)
            //좌측요소
            .find('img').animate({
                marginRight: 0
            }, 500)
            //우측 요소
            .parents('.change')
            .find('.content').animate({
                marginLeft: 0
            }, 500);

    }
}

function growScrollEvt() {
    let headerHeight = $('header').height();
    let growScrollTop = $('.salady-story .grow').offset().top - headerHeight - $(window).height() * 0.35;

    $(window).on('scroll', function () {
        winTop = $(window).scrollTop();
        if (winTop > growScrollTop) {
            growShow();
        }
    });
}

function growShow() {
    if (!$('.salady-story .grow').hasClass('animated')) {
        $('.salady-story .grow').addClass('animated');
        $('.salady-story .grow').animate({
            opacity: 1
        }, 500)
            .find('img').animate({
                marginLeft: 0
            }, 500).parents('.grow')
            .find('.content').animate({
                marginRight: 0
            }, 500);
    }
}

function futureScrollEvt() {
    let headerHeight = $('header').height();
    let futureScrollTop = $('.salady-story .future').offset().top - headerHeight - $(window).height() * 0.35;

    $(window).on('scroll', function () {
        winTop = $(window).scrollTop();
        if (winTop > futureScrollTop) {
            futureShow();
        }
    });
}

function futureShow() {
    if (!$('.salady-story .future').hasClass('animated')) {
        $('.salady-story .future').addClass('animated');
        $('.salady-story .future').animate({
            opacity: 1
        }, 500)
            //좌측요소
            .find('img').animate({
                marginRight: 0
            }, 500)
            //우측 요소
            .parents('.future')
            .find('.content').animate({
                marginLeft: 0
            }, 500);
    }
}