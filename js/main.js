//main.js 



//호출
$(function () {


    //왼쪽 이미지 슬라이드 준비
    slideHeight = $('main .img-box ul li').height();
    $('.img-box ul').prepend($('.img-box ul li').last());
    $('.img-box ul').css({
        marginTop: -slideHeight
    });



    //여기에 함수 넣기
    pagerSlide();
    nextPage();
    prevPage();

});






///전역변수 
let cnt = 0;
let slideHeight = $('main .img-box ul li').height();
const bgColor = ['#008278', '#f1a94b', '#a2b570'];
const progressBar = ['33.33%', '66.66%', '100%']

///전역함수
////////pagerSlide()
function pagerSlide() {

    //최초실행!!!!
    fadeShow();

    console.log(slideHeight);

}

////////fadeShow()
function fadeShow() {

    $('main .txt-box li, .mid-img li').hide();

    $('main .txt-box li').eq(cnt).fadeIn(600);
    $('main .mid-img li').eq(cnt).fadeIn(600);
}

function txtBoxBgChg() {
    $('.txt-box').css({
        backgroundColor: bgColor[cnt]
    })
}


////////nextPage()
function nextPage() {
    slideHeight = $('main .img-box ul li').height();


    $('.pager #next').stop(true, true).on('click', function (e) {
        //a태그 기본기능 방지
        e.preventDefault();


        //.img-box ul 이동
        $('.img-box ul').animate({
            marginTop: -(slideHeight * 2)
        }, 800, function () {
            cnt++;
            if (cnt === 3) cnt = 0;

            fadeShow();
            txtBoxBgChg();

            //.pager-status .progress-bar 변경
            $('.pager-status .progress-bar').css({
                width: progressBar[cnt]
            });

            //.pager-status .progress-bar 변경
            $('.pager-status').find('.num-now').text('0' + (cnt + 1)).parent().find('.progress-bar').css({
                width: progressBar[cnt]
            });
            
            //다음을 위한 준비
            $('.img-box ul').append($('.img-box ul li').first());
            $('.img-box ul').css({
                marginTop: -slideHeight
            });



        });


    });


}

////////prevPage()

function prevPage() {
    slideHeight = $('main .img-box ul li').height();


    $('.pager #prev').stop(true, true).on('click', function (e) {
        //a태그 기본기능 방지
        e.preventDefault();


        //.img-box ul 이동
        $('.img-box ul').animate({
            marginTop: 0
        }, 800, function () {
            cnt--;
            if (cnt === -1) cnt = 2;

            fadeShow();
            txtBoxBgChg();

            //.pager-status .progress-bar 변경
            $('.pager-status').find('.num-now').text('0' + (cnt + 1)).parent().find('.progress-bar').css({
                width: progressBar[cnt]
            });

            //다음을 위한 준비
            $('.img-box ul').prepend($('.img-box ul li').last());
            $('.img-box ul').css({
                marginTop: -slideHeight
            });

        });

    });

}




