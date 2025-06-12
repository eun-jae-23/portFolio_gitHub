$(function () {

    let scrollT = $('.content-wrap .step-content').offset().top;
    if ( $('html, body').scrollTop() === scrollT ) oneShow();



    stepClickOn();

    nameClickOn();


});


///////////////////////////////////////////////////

//// 전역함수, 전역변수 모음 //////////////////////////////////////////

// oneShow();
// .content-box .img-box가 왼->오 방향으로 나타나고,
// .content-box .txt-wrap이 오->왼 방향으로 나타남
// 1. 0초 : 초기에 css display none 상태 + css({marginLeft -300px or marginRignt -300px})였다가
// 2. 0초~1초 :  show(1000)로 1초동안 서서히 나타남 + animate({marginLeft-0 or marginRignt-0},1000)로 1초동안 이동
//stepClick
function oneShow() {

    //1
    $('.content-box .img-box').css({ marginLeft: '-200px' });
    $('.content-box .txt-wrap').css({ marginRight: '-200px' });

    //2
    $('.content-box .img-box').animate({
        marginLeft: 0,
        opacity: 1
    }, 800, 'linear');

    $('.content-box .txt-wrap').animate({
        marginRight: 0,
        opacity: 1
    }, 800, 'linear');
}


// stepClickOn();
// 버튼(.mysalady .content-wrap .stepBtn-wrap a)클릭했을 때
// on클래스 활성화 및 oneShow 작동
function stepClickOn() {

    $('.mysalady .content-wrap .stepBtn-wrap a').click(function (evt) {
        evt.preventDefault();
        let idx = $(this).index();

        $(this).addClass('on').siblings().removeClass('on');
        oneShow();

        $('.mysalady .content-wrap .step-content .content-box').eq(idx).addClass('on').siblings().removeClass('on');
    });
}


// nameClickOn();
//버튼(.mysalady .content-wrap .step-content .content-box .btn-wrap a)클릭했을 때
// on클래스 활성화

function nameClickOn() {

    $('.mysalady .content-wrap .step-content .content-box .txt-wrap .btn-wrap a').click(function (evt) {
        evt.preventDefault();
        let idx = $(this).index();
        //console.log(idx);

        $(this).addClass('on').siblings().removeClass('on');

        $('.mysalady .content-wrap .step-content .img-box img').eq(idx).addClass('on').siblings().removeClass('on');
    });
}


