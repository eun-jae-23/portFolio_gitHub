$(function(){
    $('header').addClass('header-scrolled');  

    oneScrollEvt();

    highlightAnimation();

});

//// 구현 메모 //////////////////////////////////////////
//// 전역함수, 전역변수 모음 //////////////////////////////////////////

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

function oneShow (){
    //oneScrollEvt 끝나고 콜백함수로 보여져야 할 요소들
    $('.top-title .txt-wrap .txt-box').eq(0).animate({
        top: 0,
        opacity: 1
    },500,function(){
        $('.top-title .txt-wrap .txt-box').eq(1).animate({
            top: 0,
            opacity: 1
        },500,function(){
            $('.top-title .txt-wrap .txt-box').eq(2).animate({
                top: 0,
                opacity: 1
            },500)
        })
    })
}

function highlightAnimation() {
    const windowHeight = $(window).height();
    const settingHeight = windowHeight * 0.8;
    const animatedElements = new Set();

    $(window).on('scroll', function() {
        $('.highlight').each(function() {
            const $this = $(this);
            const elementId = $this.text();

            if (animatedElements.has(elementId)) return;

            const highlightOffset = $this.offset().top;
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop + settingHeight >= highlightOffset) {
                $this.addClass('active');
                animatedElements.add(elementId);
            }
        });
    });
}


