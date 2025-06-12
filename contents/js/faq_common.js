// 아코디언 

//호출
$(function () {
    //아코디언 초기 세팅:첫번째 .faq-box의 .a-box 제외 다 hide처리
    $('.faq-box').find('.a-box').hide();
    $('.faq-box:first').find('.a-box').show();

    accordionBox();

});


///////////////////////// 변수와 함수 ////////////////////////////////

function accordionBox() {

    //faq-box 제일 큰 부모

    //이벤트 발생 : .faq-box를 클릭하면
    $('.faq-box').on('click', function () {


        //1) this에 on클래스 추가 ,하위 선택자 중 .a-box찾아서 슬라이드다운,
        $(this).addClass('on').find('.a-box').slideDown()
        //2) this의 siblings에 on클래스 제거, 그 자식들의 하위 선택자 중 모든.a-box를 슬라이드업
        .parents('.faq-box').siblings().removeClass('on').find('.a-box').slideUp();


        //3) .accordion-arrow img (this) attr로 src "../common-img/common_icon_chevron-3_btm.png"로 변경
        $(this).find('.accordion-arrow img').attr('src',"../common-img/common_icon_chevron-3_btm.png");
        $(this).siblings().find('.accordion-arrow img').attr('src',"../common-img/common_icon_chevron-3_top.png");

    });


}