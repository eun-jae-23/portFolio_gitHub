// 아코디언 

//호출
$(function () {
    //아코디언 초기 세팅
    //변수값 할당
    $faqBox = $('.faq-box');
    $aBox = $('.a-box');

    //1) 모든 .faq-box 하위요소 .a-box display none처리
    $faqBox.find($aBox).css({
        display: 'none'
    });

    //2) .on클래스 하위 요소 .a-box만 display flex처리
    $('.faq-wrap .on').find($aBox).css({
        display: 'flex'
    });

    //3) .on클래스 하위요소 .btn-wrap img 변경
    $('.faq-wrap .on').find('.btn-wrap img').attr('src',"../common-img/common_icon_chevron-3_top.png");

    //아코디언 효과
    accordionBox();
});


///////////////////////// 변수와 함수 ////////////////////////////////

//변수 선언
let $faqBox;
let $aBox;

//함수 accordionBox();
function accordionBox() {

    //faq-box 제일 큰 부모

    //이벤트 발생 : .faq-box를 클릭하면
    $faqBox.on('click', function () {


        //1) this에 on클래스 추가 ,하위 선택자 중 .a-box찾아서 슬라이드다운,
        $(this).addClass('on').find($aBox).stop(true,true).slideDown()
        //2) this의 siblings에 on클래스 제거, 그 자식들의 하위 선택자 중 모든.a-box를 슬라이드업
        .parents($faqBox).siblings().removeClass('on').find($aBox).slideUp();


        //3) .accordion-arrow img (this) attr로 src "../common-img/common_icon_chevron-3_btm.png"로 변경
        $(this).find('.btn-wrap img').attr('src',"../common-img/common_icon_chevron-3_top.png");
        $(this).siblings().find('.btn-wrap img').attr('src',"../common-img/common_icon_chevron-3_btm.png");

    });



}