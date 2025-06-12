$(function(){
    $('header').addClass('header-scrolled');


    tabmenuClick();
    



});




///// tabmenuClick 함수 /////////////////////////////////////////////////////



function tabmenuClick () {

    // .tabmenu에 클릭한 버튼에 따라 .content-wrap에서 보여지는 .menu-wrap바꿔주기 //

    $('.content .tabmenu a').on('click', function(e){
        //1. a의 기본기능 막기
        e.preventDefault();

        //2. 버튼 디자인 설정
        $(this).addClass('on').siblings().removeClass('on');
        var tabmenuIdx = $(this).index();

        //3. 보여지는 .menu-wrap 설정
        //3-1. 전체 display none
        $('.content .content-wrap .menu-wrap').css('display','none')
        //3-2. 선택된 페이지 display block
        $('.content .content-wrap .menu-wrap').eq(tabmenuIdx).css('display','block')

        //4. 스크롤 위치 조정
        var menuTop = $('.menu').offset().top;
        console.log(menuTop);
        var menuMarginTop = parseInt($('.menu').css('margin-top'));
        console.log(menuMarginTop);
        var headerHeight = $('header').height();
        console.log(headerHeight);


        $('html, body').animate({scrollTop : menuTop - (menuMarginTop + headerHeight)},500);
        

    });
    
}


//////////////////////////////////////////////////////////////////////////////

