//index.html
//ver2

$(document).ready(function () {
        
    //main
    console.log(page);


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



//// 전역함수, 전역변수 모음 //////////////////////////////////////////


/************  main 영역 시작 **************************************/

// 리팩토링된 슬라이드 코드 - 전역변수 최소화, 상태 객체 사용

// 슬라이드 상태 객체 선언
const stat = {
    page: 0,
    totalPage: $('main .img-box ul li').length,
    imgBoxH: $('main .img-box ul li').height(),
    autoSlide: null
};

//// pageLimit //////////////////////////////////////////////////
function pageLimit(stat) {
    if (stat.page === -1) {
        stat.page = stat.totalPage - 1;
    } else if (stat.page === stat.totalPage) {
        stat.page = 0;
    }
}

//// pagerStat //////////////////////////////////////////////////
function pagerStat(stat) {
    $('.num-now').text('0' + (stat.page + 1));
    let statBarW = (stat.page + 1) * 33.33;
    $('.progress-bar').css({ width: statBarW + '%' });
}

//// imgBoxMove (자동 슬라이드) //////////////////////////////////
function imgBoxMove(stat) {
    stat.page++;
    pageLimit(stat);
    pagerStat(stat);
    txtBoxBg(stat);
    txtBoxShow(stat);
    midImgShow(stat);

    $('main .img-box ul').animate({
        marginTop: -stat.imgBoxH
    }, 1000, function () {
        $('main .img-box ul li:first').appendTo('main .img-box ul');
        $('main .img-box ul').css({ marginTop: 0 });
    });
}

//// txtBoxBg ///////////////////////////////////////////////////
function txtBoxBg(stat) {
    const colors = ['#008278', '#f1a94b', '#a2b570'];
    $('main .txt-box').css({ backgroundColor: colors[stat.page] || '#fff' });
}

//// txtBoxShow /////////////////////////////////////////////////
function txtBoxShow(stat) {
    $('main .txt-box ul li').hide().eq(stat.page).show();
}

//// midImgShow /////////////////////////////////////////////////
function midImgShow(stat) {
    $('main .mid-img ul li').hide().eq(stat.page).show();
}

//// pagerClick /////////////////////////////////////////////////
function pagerClick(stat) {
    $('main .img-box ul li:last').prependTo('main .img-box ul');
    $('main .img-box ul').css({ marginTop: -stat.imgBoxH });

    $('#prev').click(function (e) {
        clearInterval(stat.autoSlide);
        e.preventDefault();
        stat.page--;
        pageLimit(stat);
        pagerStat(stat);
        txtBoxBg(stat);
        txtBoxShow(stat);
        midImgShow(stat);

        $('main .img-box ul').animate({
            marginTop: 0
        }, 1000, function () {
            $('main .img-box ul li:last').prependTo('main .img-box ul');
            $('main .img-box ul').css({ marginTop: -stat.imgBoxH });
            stat.autoSlide = setInterval(() => imgBoxMove(stat), 4000);
        });
    });

    $('#next').click(function (e) {
        clearInterval(stat.autoSlide);
        e.preventDefault();
        stat.page++;
        pageLimit(stat);
        pagerStat(stat);
        txtBoxBg(stat);
        txtBoxShow(stat);
        midImgShow(stat);

        $('main .img-box ul').animate({
            marginTop: -(stat.imgBoxH * 2)
        }, 1000, function () {
            $('main .img-box ul li:first').appendTo('main .img-box ul');
            $('main .img-box ul').css({ marginTop: -stat.imgBoxH });
            stat.autoSlide = setInterval(() => imgBoxMove(stat), 4000);
        });
    });
}

/************ main 영역 끝 **************/

// 초기 실행
$(document).ready(function () {
    pagerClick(stat);
    txtBoxShow(stat);
    midImgShow(stat);
    stat.autoSlide = setInterval(() => imgBoxMove(stat), 4000);
});





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
