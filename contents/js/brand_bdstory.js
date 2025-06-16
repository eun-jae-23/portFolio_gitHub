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

    //3) article 좌측 자식요소 img 마진left -200, 우측 자식요소 .content 마진right -200
    $('.salady-story article img').css({
        marginLeft: -300
    })
    $('.salady-story article .content').css({
        marginRight: -300
    })

    //사전 세팅 시작 끝 ////////////////////////////

    oneScrollEvt();
});

//// 구현 메모 //////////////////////////////////////////
//// 전역함수, 전역변수 모음 //////////////////////////////////////////

function oneScrollEvt() {
    let isExecuted = false;
    let htmlHeight = $('html').height();
    let finalScrollTop = htmlHeight - $('header').height();

    $(window).on('scroll', function () {
        if (!isExecuted) {
            $('html, body').animate({
                scrollTop: finalScrollTop
            }, 800, oneShow);
            isExecuted = true;
            $(window).off('scroll');
        }
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



function changeScrollEvt() {
    let isExecuted = false;
    let changeScrollTop = $('.salady-story .change').scrollTop();
    let finalScrollTop = changeScrollTop - $('header').height();

    $(window).on('scroll', function () {
        if (!isExecuted) {
            $('html, body').animate({
                scrollTop: finalScrollTop
            }, 800, changeShow);
            isExecuted = true;
            $(window).off('scroll');
        }
    });
}

function changeShow() {

    //changeScrollEvt 끝나고 콜백함수로 처음 보여져야 할 요소들
    //.change
    //좌측 요소
    $('.salady-story .change').animate({
        opacity: 1
    }, 500)
        .find('img').animate({
            marginLeft: 0
        }, 500).parents('.change')
        //우측 요소
        .find('.content').animate({
            marginRight: 0
        }, 500);

}



function growScrollEvt() {
    let isExecuted = false;
    let growScrollTop = $('.salady-story .grow').scrollTop();
    let finalScrollTop = growScrollTop - $('header').height();

    $(window).on('scroll', function () {
        if (!isExecuted) {
            $('html, body').animate({
                scrollTop: finalScrollTop
            }, 800, growShow);
            isExecuted = true;
            $(window).off('scroll');
        }
    });
}

function growShow() {

    //growScrollEvt 끝나고 콜백함수로 처음 보여져야 할 요소들
    //.grow
    //좌측 요소
    $('.salady-story .grow').animate({
        opacity: 1
    }, 500)
        .find('img').animate({
            marginLeft: 0
        }, 500).parents('.grow')
        //우측 요소
        .find('.content').animate({
            marginRight: 0
        }, 500);

}

function futureScrollEvt() {
    let isExecuted = false;
    let futureScrollTop = $('.salady-story .future').scrollTop();
    let finalScrollTop = futureScrollTop - $('header').height();

    $(window).on('scroll', function () {
        if (!isExecuted) {
            $('html, body').animate({
                scrollTop: finalScrollTop
            }, 800, futureShow);
            isExecuted = true;
            $(window).off('scroll');
        }
    });
}

function futureShow() {

    //futureScrollEvt 끝나고 콜백함수로 처음 보여져야 할 요소들
    //.future
    //좌측요소
    $('.salady-story .future').animate({
        opacity: 1
    }, 500)
        .find('.content').animate({
            marginRight: 0
        }, 500).parents('.future')
        //우측 요소    
        .find('img').animate({
            marginLeft: 0
        }, 500);


}