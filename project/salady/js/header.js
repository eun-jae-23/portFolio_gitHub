/* header.js */

$(function () {

    //모든 페이지에는 헤더가 있음 + 새로고침 시 스크롤 0으로 초기화
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };

    DropDownMenu();
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

