//index.html

$(function () {

    //header
    headDgnChg();

    //main
    //구현 안되는 부분 : main /////////////////////////////////
    //mainCycle(); -> ctrl+F로 'main 영역 시작' 부분부터 설계 있음

    


    //article
    menuBtnSrc();

    //article.new-salady
    newSaladySlide();

    //article.best-salady
    bestSaladySlide();

    //section.brand-introduce
    brandBtnSrc();

});





//// 전역함수, 전역변수 모음 //////////////////////////////////////////

/************ header 영역 시작 **************************************/

// headDgnChg();
// 헤더 디자인 변경 함수

function headDgnChg() {
    // 전역 변수로 상태 관리
    let currentState = false;
    let winH = $(window).height();

    // CSS 클래스 정의
    const headerClasses = {
        scrolled: 'header-scrolled',
        default: 'header-default'
    };

    // 초기 상태 설정
    $('header h1 img').removeClass('on').eq(1).addClass('on');
    $('header').addClass(headerClasses.default);

    // 이벤트 핸들러 함수
    function handleScroll() {
        const currentScroll = $(window).scrollTop();

        if (currentScroll > winH && !currentState) {
            $('header h1 img').removeClass('on').eq(0).addClass('on');
            $('header')
                .removeClass(headerClasses.default)
                .addClass(headerClasses.scrolled);
            currentState = true;
        } else if (currentScroll <= winH && currentState) {
            $('header h1 img').removeClass('on').eq(1).addClass('on');
            $('header')
                .removeClass(headerClasses.scrolled)
                .addClass(headerClasses.default);
            currentState = false;
        }
    }

    // 이벤트 바인딩 (한 번만)
    $(window)
        .on('resize', function () {
            winH = $(window).height();
        })
        .on('scroll', handleScroll);
}





/************  main 영역 시작 **************************************/
/************  main 영역 시작 **************************************/

// mainCycle();
// 메인 영역 자동 슬라이드 함수
function mainCycle() {

    /* 
    
    제이쿼리 구현해야할 것 설계
    
    1. 자동메인페이지 UI변경 (요소 변경 및 슬라이드구현)
    2. 페이저 버튼 누르면 자동메인페이지 UI변경 멈추고(stop메서드 써야 하나요?) 슬라이드 이동 후에 자동슬라이드 재개
    
    // const bgColor = ['#008278', '#f1a94b', '#a2b570'];
    
    //페이저 설명 : 왼쪽 버튼을 누르면 페이지 -1, 오른쪽 버튼을 누르면 페이지 +1
    //요소들이 총 3개이므로,  얻어서 페이저가 전체 요소 갯수와 같아지면 0이 되도록 해야하나?
    
    
    1.자동메인페이지 UI변경 (요소 변경 및 슬라이드구현)
    //기본 틀 : 4초마다 main .txt-box ul li, main .mid-img ul li, main .txt-box 요소가 페이지 바뀔 때 마다 다음 형제요소로 바뀌어야함 - setInterval 어떻게 사용해야할 지 모르겠음
    
    //0초 시점(첫번째 페이지-인덱스 기준 page 0) - 처음 문서가 불러와졌을 때 기본 세팅
    //main .img-box ul li, main .txt-box ul li의 첫번째 요소만 보여줘야 하는데, 어떤식으로 보여지냐면 문서가 불러와지자마자 (1).mid-img ul li는 fadeIn(500)효과로 보여지면서 나머지 남은 3.5초동안 중심점 요소 가운데로 설정된 상태에서 좌,우 번갈아가며 15도씩 회전,(2)main .txt-box ul li는 opacity:0, marginright:30px 에서 animate로 0.5초동안 투명도 opacity:1이 되고 marginright:230px이 되게 함
    (3) main .txt-box ul li, main .mid-img ul li 의 첫번째 요소 외 형제요소들은 모두 (hide) 상태
    
    //왼쪽 사진 슬라이드 : main .img-box ul li는 첫번째 요소만 .img-box 영역에 보여지게 세팅 된 상태이며, 슬라이드 되게 구현할 것이라 다른 요소 숨김처리 안하고 marginTop 및 appendTo, prependTo로 요소들 조절하면서 페이지 바뀔 때 마다 구현할 것임
    
    
    //4초 (두번째 페이지 - 인덱스 기준 page1)
    ////main .txt-box ul li, main .mid-img ul li 의 두 번째 요소만 보여줘야 하는데,
    //어떤식으로 보여지냐면 4초가 되자마자
    (1).mid-img ul li는 fadeIn(500)효과로 보여지면서 나머지 남은 3.5초동안 중심점 요소 가운데로 설정된 상태에서 좌,우 번갈아가며 15도씩 회전,(2)main .txt-box ul li는 opacity:0, marginright:30px 에서 animate로 0.5초동안 투명도 opacity:1이 되고 marginright:230px이 되게 함
    (3)  main .txt-box ul li, main .mid-img ul li 의 두번째 요소 외 형제요소들은 모두 (hide) 상태
    
    //페이저 변경!
    //.pager-status의 .num-now 텍스트가 02(현재 페이지 기준으로 .num-now의 텍스트는 바뀌게 하려고 함)가 되어야 하며, .progress-bar의 너비가 .status-bar의 2/3 (약 66%) 너비가 되어야 함 (즉 첫번째 페이지일 때는 기본값으로 너비 1/3이고, 두번째는 2/3, 세번째는 3/3인 것!)
    
    //왼쪽 사진 슬라이드 : main .img-box ul li는첫번째 요소가 위로 올라가면서 두 번째 요소가 .img-box 영역에 보여지는 슬라이드가 구현되어야 함 
    
    
    2. 페이저 버튼 누르면 자동메인페이지 UI변경 멈추고(stop메서드 써야 하나요?) 슬라이드 이동 후에 자동슬라이드 재개
    
    //2-1. 기존에 진행되고 있던 자동메인페이지 UI변경 부분 멈춰야 하나..?
    
    //2-2. prev,next 눌렀을 때 
    //페이저 변경!
    //.pager-status의 .num-now 텍스트가 어떤 버튼 누르냐에 따라 달라짐, .progress-bar의 너비가 .status-bar의 너비가 어떤 버튼 누르냐에 따라 달라짐
    
    //해당 페이지의 요소 및 나머지 형제요소 아래와 같이 처리!
    (1).mid-img ul li는 fadeIn(500)효과로 보여지면서 나머지 남은 3.5초동안 중심점 요소 가운데로 설정된 상태에서 좌,우 번갈아가며 15도씩 회전,(2)main .txt-box ul li는 opacity:0, marginright:30px 에서 animate로 0.5초동안 투명도 opacity:1이 되고 marginright:230px이 되게 함
    (3)  main .txt-box ul li, main .mid-img ul li 의 두번째 요소 외 형제요소들은 모두 (hide) 상태
    
    //왼쪽 사진 슬라이드 : prev 버튼 눌렀을 때는 main .img-box ul li는 버튼 누르기 전에 보여지는 li가 위로 올라가면서 그 다음 li가 아래에서 위로 올라와지며 .img-box 영역에 보여지는 슬라이드가 구현되어야 함, next버튼 눌렀을 때는 반대
    
    */
    
    }
    







/************  <main> 영역 끝 **************************************/


//-- menuBtnSrc(); ----------------------------------------------
/////// .menu article .btn (.prev, .next) hover src 변경
function menuBtnSrc() {
    $('.menu article .prev').hover(function () {
        $('.menu article .prev img').attr({
            src: 'common-img/common_icon_arrow-white_left.png'
        })
    },
        function () {
            $('.menu article .prev img').attr({
                src: 'common-img/common_icon_arrow-green_left.png'
            })
        });

    $('.menu article .next').hover(function () {
        $('.menu article .next img').attr({
            src: 'common-img/common_icon_arrow-white_right.png'
        })
    },
        function () {
            $('.menu article .next img').attr({
                src: 'common-img/common_icon_arrow-green_right.png'
            })
        });
}


//-- newSaladySlide(); ----------------------------------------------
/////// .new-salady .slider-wrap 슬라이드 설정
function newSaladySlide() {
    $('.new-salady .slider ul li:last').prependTo('.new-salady .slider ul');
    let liW = $('.new-salady .slider ul li').width();

    $('.new-salady .slider ul').css('margin-left', -liW);

    /* 다음버튼 */
    $('.new-salady .slider-wrap .next').click(function () {
        $('.new-salady .slider ul').animate({
            marginLeft: '-=' + liW
        }, 800, function () {
            $('.new-salady .slider ul li').first().appendTo('.new-salady .slider ul');
            $('.new-salady .slider ul').css('margin-left', -liW);
        });
    });

    /* 이전버튼 */
    $('.new-salady .slider-wrap .prev').click(function () {
        $('.new-salady .slider ul').animate({
            marginLeft: '+=' + liW
        }, 800, function () {
            $('.new-salady .slider ul li').last().prependTo('.new-salady .slider ul');
            $('.new-salady .slider ul').css('margin-left', -liW);
        })
    });
}


//-- bestSaladySlide(); ----------------------------------------------
/////// .best-salady .slider-wrap 슬라이드 설정
function bestSaladySlide() {
    $('.best-salady .slider ul li:last').prependTo('.best-salady .slider ul');
    let liW = $('.best-salady .slider ul li').width();
    $('.best-salady .slider ul').css('margin-left', -liW);
    /* 다음버튼 */
    $('.best-salady .slider-wrap .next').click(function () {
        $('.best-salady .slider ul').animate({
            marginLeft: '-=' + liW
        }, 800, function () {
            $('.best-salady .slider ul li').first().appendTo('.best-salady .slider ul');
            $('.best-salady .slider ul').css('margin-left', -liW);
        });
    });

    /* 이전버튼 */
    $('.best-salady .slider-wrap .prev').click(function () {
        $('.best-salady .slider ul').animate({
            marginLeft: '+=' + liW
        }, 800, function () {
            $('.best-salady .slider ul li').last().prependTo('.best-salady .slider ul');
            $('.best-salady .slider ul').css('margin-left', -liW);
        })
    });
}


//-- brandBtnSrc(); ----------------------------------------------
/////// .brand-introduce .content .btn img hover src 변경
function brandBtnSrc() {
    //첫번째 버튼
    $('.brand-introduce .content .btn:first').hover(function () {
        $('.brand-introduce .content .btn:first img').attr({
            src: 'common-img/common_icon_arrow-green_right.png'
        })
    }, function () {
        $('.brand-introduce .content .btn:first img').attr({
            src: 'common-img/common_icon_arrow-white_right.png'
        })
    });
    //두번째 버튼
    $('.brand-introduce .content .btn:last').hover(function () {
        $('.brand-introduce .content .btn:last img').attr({
            src: 'common-img/common_icon_arrow-green_right.png'
        })
    }, function () {
        $('.brand-introduce .content .btn:last img').attr({
            src: 'common-img/common_icon_arrow-white_right.png'
        })
    });
}
