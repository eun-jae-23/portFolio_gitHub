$(function () {

    eventSlide();

    imgBoxHover();

    eventMoreBtn();


});

//// 전역함수, 전역변수 모음 //////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// eventSlide();
// 슬라이드 관련 움직임 하나의 함수로 통합
// 1. 슬라이드이전, 다음버튼을 클릭할 때의 각각 슬라이드 이동 함수 및 이미지 변경
// 2. 슬라이드 안 테두리 있는 사각 버튼 hover했을 때 화살표 이미지 색상 변경
function eventSlide() {

    //1.
    //슬라이드 하나당 너비 구하기
    let slideW = $('.slide').width();
    //console.log(slideW);

    //준비
    $('.slide:last').prependTo('.slide-wrap');
    $('.slide-wrap').css({

        marginLeft: -slideW
    });

    //이전 버튼 클릭 & 호버
    // 1) 호버-mouseenter,mouseleave할 때 사진 바뀌어야 함
    // 2) 클릭할 때 슬라이드 한번의 이동, 한번의 준비
    $('.prev').on({
        'mouseenter': function () {

            $(this).find('img').attr('src', '../common-img/common_icon_arrow-white_left.png');
        },

        'mouseleave': function () {

            $(this).find('img').attr('src', '../common-img/common_icon_arrow-green_left.png');
        },

        'click': function (evt) {
            evt.preventDefault();
            $('.slide-wrap').animate({
                marginLeft: '+=' + slideW
            }, 800, function () {
                $('.slide').last().prependTo('.slide-wrap');
                $('.slide-wrap').css({
                    marginLeft: '-=' + slideW
                });
            });
        }
    });

    //다음 버튼 클릭 & 호버
    // 1) 호버-mouseenter,mouseleave할 때 사진 바뀌어야 함
    // 2) 클릭할 때 슬라이드 한번의 이동, 한번의 준비
    $('.next').on({
        'mouseenter': function () {

            $(this).find('img').attr('src', '../common-img/common_icon_arrow-white_right.png');
        },

        'mouseleave': function () {

            $(this).find('img').attr('src', '../common-img/common_icon_arrow-green_right.png');
        },

        'click': function (evt) {
            evt.preventDefault();
            $('.slide-wrap').animate({
                marginLeft: '-=' + slideW
            }, 800, function () {
                $('.slide').first().appendTo('.slide-wrap');
                $('.slide-wrap').css({
                    marginLeft: '+=' + slideW
                });
            });
        }
    });

    //2.
    $('.slide .right-btn').hover(function () {

        //mouseenter
        $(this).find('img').attr('src', '../common-img/common_icon_arrow-white_right.png');
    }, function () {

        //mouseleave
        $(this).find('img').attr('src', '../common-img/common_icon_arrow-3_right.png');
    });


}


////////////////////////////////////////////////////////////////////////////////
// imgBoxHover();
// 이미지박스 호버 시 디자인 바뀌는 함수

function imgBoxHover() {

    $('.event .event-list .img-wrap .img-box').hover(function () {

        //mouseenter
        $(this).find('img').stop(true, true).animate({
            opacity: 0.3
        }, 300);

        $(this).find('.txt').stop(true, true).fadeIn(300);
    }, function () {

        //mouseleave
        $(this).find('img').stop(true, true).animate({
            opacity: 1
        }, 300);

        $(this).find('.txt').stop(true, true).fadeOut(300);
    });
}


////////////////////////////////////////////////////////////////////////////////
// eventMoreBtn();
// 이벤트 더보기 버튼 관련 함수
// 1. 이벤트 더보기 버튼 호버 시 화살표 색상 이미지 변경
// 2. 이벤트 더보기 버튼 클릭 시 해당(this) 버튼 a 기능 막고 img-wrap 아래로 펼쳐지기
// 3. 이벤트 더보기 버튼 클릭 시 마지막 .img-wrap이면 버튼 숨김 처리

function eventMoreBtn() {

    //초기 설정 - .event-list .img-wrap:first 빼고 다 숨김처리
    $('.event-list .img-wrap:first').siblings().hide();

    //1
    $('.btn-wrap .btn').hover(function () {

        //mouseenter
        $(this).find('img').attr('src', '../common-img/common_icon_arrow-white_btm.png');
    }, function () {

        //mouseleave
        $(this).find('img').attr('src', '../common-img/common_icon_arrow-5d_btm.png');
    });

    //2

    let i = 0;

    $('.btn-wrap .btn').click(function (evt) {
        
        evt.preventDefault();
        let totalIdx = $('.event-list .img-wrap').length;
        i++;
        //console.log(i);


        if (i < (totalIdx -1)) {
            $('.event-list .img-wrap').eq(i).slideDown(800, function () {
                let posT = $(this).offset().top;
                $('html, body').animate({
                    scrollTop: posT
                }, 800);
            })

        } else if (i == (totalIdx -1)) {
            $('.btn-wrap').slideUp(800);
            $('.event-list .img-wrap').eq(i).slideDown(800, function () {
                let posT = $(this).offset().top;
                $('html, body').animate({
                    scrollTop: posT
                }, 800);
            })
        };



    })

}
