$(function(){

    headerGreen();

});


//// 헤더 디자인 변경 함수 //////
function headerGreen () {
    $('header h1 a img:first').removeClass('on').siblings().addClass('on');

    $('header').css({
        backgroundColor: '#008278'
    });

    $('header nav.gnb .gnb-wrap .gnb-box .gnb-name').css({
        color: '#fff'
    });
    // 햄버거 버튼 색상 흰색으로 변경
    $('header .nav-wrap nav.siteMap .allMenu span').css({
        backgroundColor: '#fff'
    });
}