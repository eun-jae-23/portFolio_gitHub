/* header.js */

$(function () {

    //모든 페이지에는 헤더가 있음 + 새로고침 시 스크롤 0으로 초기화
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };

    DropDownMenu();
    siteMap();
});





// 전역함수모음 /////////////////////////////////////////////////

//-- DropDownMenu(); ----------------------------------------------

// *** 탭메뉴 구현 ***
// 1. 기본 세팅 : .lnb 숨김
// 2. 마우스를 .gnb-box올리면, .lnb 나타나게
// 3. 마우스가 .gnb-box 로부터 벗어나면 .lnb 사라지게
// 4. .lnb의 a태그에 마우스를 올리면 색상 #008278, 부드럽게
// 5. .lnb의 a태그로부터 마우스가 벗어나면 색상 #333, 부드럽게

function DropDownMenu () {
    // 1. 기본 세팅 : .lnb 숨김
    $('header .nav-wrap .gnb .lnb').hide();

    // 2. 마우스를 .gnb-box올리면, .lnb 나타나게
    // 3. 마우스가 .gnb-box 로부터 벗어나면 .lnb 사라지게
    $('header .nav-wrap .gnb .gnb-box').hover(function () {
        $(this).find('.lnb').stop(true, true).slideDown(200);
    }, function () {
        $(this).find('.lnb').stop(true, true).slideUp(200);
    });


    
    $('header .nav-wrap .gnb .lnb li a').css({
        //기본세팅 - transition
            transition: 'all 0.3s'
    }).hover(function () {
        // 4. .lnb의 a태그에 마우스를 올리면 색상 #008278
        $(this).css({
            color: '#008278'
        }, 200)
    }, function () {
        // 5. .lnb의 a태그로부터 마우스가 벗어나면 색상 #333
        $(this).css({
            color: '#333'
        }, 200)
    });
}


function siteMap () {
    // ... 기존 코드 ...
    // 사이트맵(햄버거) 메뉴 동작 추가
    // 최초에 사이트맵 gnb-wrap 숨김
    $('nav.siteMap .gnb-wrap').hide();

    // 햄버거 버튼 클릭 이벤트
    $('.allMenu').on('click', function () {
        var $siteMap = $('nav.siteMap .gnb-wrap');
        var $headerLogo = $('header h1 a img');
        var $allMenu = $(this);

        if (!$siteMap.hasClass('active')) {
            // 사이트맵 열기
            $siteMap.stop(true, true)
                .css({display: 'grid', height: 0, opacity: 0})
                .animate({height: '100%', opacity: 1}, 300, function(){
                    $siteMap.addClass('active');
                });
            $allMenu.addClass('active');
            // 로고 흰색으로 고정
            $headerLogo.removeClass('on');
            $headerLogo.eq(1).addClass('on');
            // 햄버거(X) 버튼 span 흰색으로 고정
            $('.allMenu span').css('background-color', '#fff');
        } else {
            // 사이트맵 닫기
            $siteMap.stop(true, true)
                .animate({height: 0, opacity: 0}, 300, function () {
                    $siteMap.removeClass('active');
                    $siteMap.css({display: 'none'});
                });
            $allMenu.removeClass('active');
            // 로고/버튼 색상 복원: 스크롤 이벤트 트리거
            $(window).trigger('scroll');
        }
    });

    // 스크롤/리사이즈 시에도 siteMap이 열려있으면 로고/버튼 색상 고정
    $(window).on('scroll resize', function () {
        var $siteMap = $('nav.siteMap .gnb-wrap');
        var $headerLogo = $('header h1 a img');
        if ($siteMap.hasClass('active')) {
            // 로고 흰색으로 고정
            $headerLogo.removeClass('on');
            $headerLogo.eq(1).addClass('on');
            // 햄버거(X) 버튼 span 흰색으로 고정
            $('.allMenu span').css('background-color', '#fff');
        }
    });
}
