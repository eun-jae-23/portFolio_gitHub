//main.js 



//호출

$(function () {


    //기본 세팅 : 왼쪽 이미지 슬라이드 준비
    slideHeight = $('main .img-box ul li').height();
    $('.img-box ul').prepend($('.img-box ul li').last());
    $('.img-box ul').css({
        marginTop: -slideHeight
    });

    //최초 실행 및 자동 슬라이드 초 시작
    pagerSlide();
    startAutoSlide();

    //페이저 버튼 눌렀을 때 호출할 함수
    nextPage();
    prevPage();

});



/* 

//호출 - 자동슬라이드 테스트 -> 된다!
$(function () {

    //기본 세팅 : 왼쪽 이미지 슬라이드 준비
    slideHeight = $('main .img-box ul li').height();
    $('.img-box ul').prepend($('.img-box ul li').last());
    $('.img-box ul').css({
        marginTop: -slideHeight
    });

    //최초 실행
    pagerSlide();
    setInterval(nextAnimate, 3500);

});


 */


///전역변수 
let cnt = 0;
let slideHeight = $('main .img-box ul li').height();
const bgColor = ['#008278', '#f1a94b', '#a2b570'];
const progressBar = ['33.33%', '66.66%', '100%'];
let autoSlideInterval; // 자동 슬라이드 interval ID 저장용 변수

///전역함수
////////pagerSlide()
function pagerSlide() {
    //최초실행!!!!
    fadeShow();
    //console.log(slideHeight);
}

// 자동 슬라이드 시작 함수
function startAutoSlide() {
    autoSlideInterval = setInterval(nextAnimate, 4000);
}

// 자동 슬라이드 중지 함수
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

//////// fadeShow()
//cnt 변화에 따른 .txt-box li와 .mid-img li의 fadeIn
function fadeShow() {

    $('main .txt-box li, .mid-img li').hide();
    $('main .txt-box li').eq(cnt).fadeIn(600);
    $('main .mid-img li').eq(cnt).fadeIn(600);
}

//////// txtBoxBgChg()
//cnt 변화에 따른  .txt-box 배경색 변화
function txtBoxBgChg() {
    $('.txt-box').css({
        backgroundColor: bgColor[cnt]
    })
}


//////// nextPage()
function nextPage() {
    slideHeight = $('main .img-box ul li').height();

    $('.pager #next').stop(true, true).on('click', function (e) {
        e.preventDefault();
        
        // 자동 슬라이드 중지
        stopAutoSlide();

        $('.img-box ul').animate({
            marginTop: -(slideHeight * 2)
        }, 800, function () {
            console.log('다음버튼 클릭시 인덱스:'+cnt);

            cnt++;
            if (cnt === 3) cnt = 0;

            fadeShow();
            txtBoxBgChg();

            $('.pager-status .progress-bar').css({
                width: progressBar[cnt]
            });

            $('.pager-status').find('.num-now').text('0' + (cnt + 1)).parent().find('.progress-bar').css({
                width: progressBar[cnt]
            });

            $('.img-box ul').append($('.img-box ul li').first());
            $('.img-box ul').css({
                marginTop: -slideHeight
            });

            // 애니메이션 완료 후 자동 슬라이드 재개
            startAutoSlide();
        });
    });
}

//////// prevPage()
function prevPage() {
    slideHeight = $('main .img-box ul li').height();

    $('.pager #prev').stop(true, true).on('click', function (e) {
        e.preventDefault();
        
        // 자동 슬라이드 중지
        stopAutoSlide();

        $('.img-box ul').animate({
            marginTop: 0
        }, 800, function () {
            console.log('이전버튼 클릭시 인덱스:'+cnt);
            cnt--;
            if (cnt === -1) cnt = 2;

            fadeShow();
            txtBoxBgChg();

            $('.pager-status').find('.num-now').text('0' + (cnt + 1)).parent().find('.progress-bar').css({
                width: progressBar[cnt]
            });

            $('.img-box ul').prepend($('.img-box ul li').last());
            $('.img-box ul').css({
                marginTop: -slideHeight
            });

            // 애니메이션 완료 후 자동 슬라이드 재개
            startAutoSlide();
        });
    });
}



/////////nextAnimate()
function nextAnimate() {
    console.log('자동슬라이드 시작시 페이지 인덱스'+cnt);
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

}






