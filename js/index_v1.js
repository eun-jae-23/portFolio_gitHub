//index.html
//ver1

$(function () {
        
    //main
    page = 0;
    pageLimit();
    autoSlide = setInterval(imgBoxMove, 4000);
    pagerClick();
    pagerStat();
    txtBoxShow();
    midImgShow();


    //article 공통
    menuBtnSrc();

    //article.new-salady
    newSaladySlide();

    //article.best-salady
    bestSaladySlide();

    //section.brand-introduce
    brandBtnSrc();


});

//// 구현해야할 것들 기록 ///////////////////////////////////////

// **<header> 영역 ***************************************************
// 1. 스크롤바 위치가 section.menu에 다다르면 디자인 초록버전으로 바뀌어야 함
// 대상(객체) : header
// 필요한 코드 : ScrollTop(), css()


// 2. .allMenu버튼을 누르면 버튼 모양이 X로 바뀌고, sitemap이 부드럽게 아래로 슬라이드 내려오듯 보여지고, X버튼 누르면 부드럽게 위로 슬라이드 올라가듯 없어지게 구현
// 대상(객체) : header .nav-wrap .sitemap .allMenu
// 필요한 코드 : 
/* ******************************************************************* */


// **<main> 영역 : 슬라이드 구현 *****************************************
// 전체 구현 설명 : 롤링 슬라이드 + 자동 슬라이드
// 디폴트 설정 : 인덱스를 기준으로 페이지 설정하여 슬라이드 바뀌게 한다!
// 필요한 코드 : selInterval()

// 1. 4초동안 다른 페이지로 넘어가야 하는데, 바뀌는 부분이 영역마다 다름
// 1-1. main .img-box
//.img-box 높이 : let imgBoxH = $('main .img-box ul li').height();
// 필요한 코드 : prependTo(), appendTo(), animate()

// 1-2. main .txt-box
// 필요한 코드 : slideDown(), delay()

// 1-3. main .mid-img
/* 필요한 코드 :
    animate({transform: 'rotate(30deg or -30deg)'})
*/

// 1-4. main .pager
// 버튼 클릭하면 1-1,1-2,1-3 다음꺼 or 이전꺼로 실행되게
// let page = 0; page++ or page--
// 이전버튼 눌러서 page === -1이면 page = 2;
// 다음버튼 눌러서 page === 3이면 page = 0;

// 2. 페이저에 이전, 다음버튼 누르면 다른 페이지로 이동되어야 함
// 




//// 전역함수, 전역변수 모음 //////////////////////////////////////////


/************  main 영역 시작 **************************************/

// main영역에 필요한 변수 선언
let page = 0; //현재 페이지 번호 0부터
let totalPage = $('main .img-box ul li').length; //실제 전체 페이지 갯수 담을 변수
let imgBoxH = $('main .img-box ul li').height(); // 슬라이드 왼쪽 이미지 1개의 높이

// main영역에 필요한 함수 선언

//// pageLimit ////////////////////////////////////////////////////////
// 함수 설명 : 페이지 최솟값, 최댓값 제어
function pageLimit () {
    if (page === -1)  {
        page = totalPage-1;
    } else if (page === totalPage) {
        page = 0;
    }
}

//// pagerStat ////////////////////////////////////////////////////////
/********************************************************************
* 함수 설명
- 페이저 상태 갱신 (1),(2)
- (1) 현재 페이지 숫자(.num-now) 표시 및 변경
- (2) 현재 페이지 진행 바(.status-bar .progress-bar) 너비 설정 및 변경
********************************************************************/
function pagerStat () {
    $('.num-now').text('0' + (page + 1)); // .num-now 표시 및 변경
    let statBarW = (page + 1)*33.33; // .progress-bar 페이지 별 너비 선언
    $('.progress-bar').css({ width : statBarW + '%'}); //.progress-bar 너비 설정
}


//// pagerClick ////////////////////////////////////////////////////////
// 함수 설명 : pager의 버튼을 클릭할 때 변동사항들 모음
function pagerClick () {

    //슬라이드 초기(page=0일 때) 설정
    $('main .img-box ul li:last').prependTo('main .img-box ul');
    $('main .img-box ul').css({ marginTop: -imgBoxH });

    //이전버튼 클릭 시 동작 및 변경사항
    $('main .pager #prev').click(function (e) {
        clearInterval(autoSlide); //자동 슬라이드 멈춤
        e.preventDefault(); //a태그 기본기능 방지

        page--; //페이지 감소
        if (page === -1) page = totalPage - 1 // 페이지가 0보다 작아지면 마지막 페이지로 설정
        pagerStat();

        //이전버튼 클릭 시 슬라이드 애니메이션
        $('main .img-box ul').animate({
            marginTop: 0
        }, 1000, function () {
            console.log(page);
            $('main .img-box ul li:last').prependTo('main .img-box ul');
            $('main .img-box ul').css({ marginTop: -imgBoxH });


            autoSlide(); //자동슬라이드 재가동
        });

    });

    //다음버튼 클릭 시 동작 및 변경사항
    $('main .pager #next').click(function (e) {
        clearInterval(autoSlide); //자동 슬라이드 멈춤
        e.preventDefault(); //a태그 기본기능 방지

        page++; //페이지 증가
        if (page === totalPage) page = 0
        pagerStat();

        //다음버튼 클릭 시 슬라이드 애니메이션
        $('main .img-box ul').animate({
            marginTop: -(imgBoxH*2)
        }, 1000, function () {
            $('main .img-box ul li:first').appendTo('main .img-box ul');
            $('main .img-box ul').css({ marginTop: -imgBoxH });


            autoSlide(); //자동슬라이드 재가동
        });
    });

}


//////////////////////////////////////////////////////////////////////
/********************************************************************
* imgBoxMove() 함수 설명
- 자동 슬라이드 .img-box ul li의 한 페이지 이동 및 다음 페이지 준비 세팅
- setInterval의 함수 자리에 넣을 함수임.
* autoSlide : setInterval에 imgBoxMove 담은 변수
-> autoSlide = setInterval(imgBoxMove, 4000);
********************************************************************/
let autoSlide;

function imgBoxMove() {
    page++;
    if (page === totalPage) page = 0;
    $('main .img-box ul').animate({
        marginTop: -imgBoxH
    }, 1000, function () {
        $('main .img-box ul li:first').appendTo('main .img-box ul');
        $('main .img-box ul').css({ marginTop: 0 });
    });
}


//// txtBoxBg() ////////////////////////////////////////////////////////
// 함수 설명 : 텍스트(.txt-box)에 대하여 페이지 변동에 따라 배경색상 특정 색상으로 변경
function txtBoxBg () {
    if (page === 0) {
        $('main .txt-box').css({
            backgroundColor : '#008278'
        });
    } else if (page === 1) {
        $('main .txt-box').css({
            backgroundColor : '#f1a94b'
        });
    } else if (page === totalPage) {
        $('main .txt-box').css({
            backgroundColor : '#a2b570'
        });
    }
}

//// txtBoxShow() /////////////////////////////////////////////////////
// 함수 설명 : 텍스트(.txt-box)에 대하여 페이지 변동에 따라 show,hide변경
function txtBoxShow () {

    //해당 페이지의 텍스트 보여주기
    $('main .txt-box ul li').eq(page).show();

}

//// midImgShow() /////////////////////////////////////////////////////
// 함수 설명 : 가운데 이미지(.mid-img)에 대하여 페이지 변동에 따라 show,hide변경
function midImgShow () {

    //기본 세팅
    $('main .mid-img ul li').eq(page).show();
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
