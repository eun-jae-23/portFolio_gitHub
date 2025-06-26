
//menu_mysalady.js

$(function () {
    $('header').addClass('header-scrolled');

    scrollCheckShow();
    stepClickOn();
    nameClickOn();
});

///////////////////////////////////////////////////

//// 전역함수, 전역변수 모음 //////////////////////////////////////////

// 실행 여부를 체크하는 플래그 변수 (전역 변수로 선언)
let isExecuted = false;

// 스크롤 이벤트를 한 번만 실행하고 내가 원하는 조건일 때 oneShow 작동
function scrollCheckShow() {
    // 이미 실행되었다면 함수 종료
    if (isExecuted) return;
    
    // 화면 세로값 가져오기
    let windowHeight = $(window).height();
    // 현재 스크롤 위치
    let scrollTop = $(window).scrollTop();
    // top-banner의 높이
    let topBannerHeight = $('section.top-banner').outerHeight();
    
    // 스크롤 위치가 top-banner 높이를 넘어섰을 때 실행
    if (scrollTop >= topBannerHeight) {
        oneShow();
        isExecuted = true;
    }
}

// 스크롤 이벤트 리스너 추가
$(window).on('scroll', scrollCheckShow);

// oneShow();
// .content-box .img-box가 왼->오 방향으로 나타나고,
// .content-box .txt-wrap이 오->왼 방향으로 나타남
function oneShow() {
    //1
    $('.content-box .img-box').css({ marginLeft: '-200px' });
    $('.content-box .txt-wrap').css({ marginRight: '-200px' });

    //2
    $('.content-box .img-box').animate({
        marginLeft: 0,
        opacity: 1
    }, 600, 'linear');

    $('.content-box .txt-wrap').animate({
        marginRight: 0,
        opacity: 1
    }, 600, 'linear');
}

// stepClickOn();
// 버튼(.mysalady .content-wrap .stepBtn-wrap a)클릭했을 때
// on클래스 활성화 및 oneShow 작동
function stepClickOn() {
    $('.mysalady .content-wrap .stepBtn-wrap a').on('click', function (evt) {


        // 기존 이벤트 제거
        evt.preventDefault();
        let idx = $(this).index();
        

        $(this).addClass('on').siblings().removeClass('on');
        oneShow();

        $('.mysalady .content-wrap .step-content .content-box').eq(idx).addClass('on').siblings().removeClass('on');

        $(this).closest('.content-box').find('.img-box img:first').addClass('on').siblings().removeClass('on');

        nameClickOn();

    });
}

// nameClickOn();
//버튼(.mysalady .content-wrap .step-content .content-box .btn-wrap a)클릭했을 때
// on클래스 활성화
function nameClickOn() {
    // 기존 이벤트 제거
    $('.mysalady .content-wrap .step-content .content-box.on .txt-wrap .btn-wrap a').off('click');
    
    // 새로운 이벤트 바인딩
    $('.mysalady .content-wrap .step-content .content-box.on .txt-wrap .btn-wrap a').on('click', function (evt) {
        evt.preventDefault();
        let idx = $(this).index();
        let currentBox = $(this).closest('.content-box');

        $(this).addClass('on').siblings().removeClass('on');
        currentBox.find('.img-box img').eq(idx).fadeIn(300).addClass('on').siblings().fadeOut(0).removeClass('on');
    });
}