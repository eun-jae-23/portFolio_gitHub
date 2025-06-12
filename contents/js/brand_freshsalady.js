$(function(){
    $('header').addClass('header-scrolled');  

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
            }, 800);
            isExecuted = true;
        }
    });
}


