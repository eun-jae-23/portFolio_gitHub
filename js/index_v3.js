//index.html
//ver3

$(function () {

    //header
    headDgnChg();

    //main
    //mainCycle();

    //article
    menuBtnSrc();

    //article.new-salady
    newSaladySlide();

    //article.best-salady
    bestSaladySlide();

    //section.brand-introduce
    brandBtnSrc();

});




//// 전역함수, 전역변수 모음 //////////////////////////////////////////

/************ header 영역 시작 **************************************/
// headDgnChg();
// 헤더 디자인 변경 함수
function headDgnChg() {
    // 전역 변수로 상태 관리
    let currentState = false;
    let winH = $(window).height();
    
    // CSS 클래스 정의
    const headerClasses = {
        scrolled: 'header-scrolled',
        default: 'header-default'
    };

    // 초기 상태 설정
    $('header h1 img').removeClass('on').eq(1).addClass('on');
    $('header').addClass(headerClasses.default);

    // 이벤트 핸들러 함수
    function handleScroll() {
        const currentScroll = $(window).scrollTop();
        
        if (currentScroll > winH && !currentState) {
            $('header h1 img').removeClass('on').eq(0).addClass('on');
            $('header')
                .removeClass(headerClasses.default)
                .addClass(headerClasses.scrolled);
            currentState = true;
        } else if (currentScroll <= winH && currentState) {
            $('header h1 img').removeClass('on').eq(1).addClass('on');
            $('header')
                .removeClass(headerClasses.scrolled)
                .addClass(headerClasses.default);
            currentState = false;
        }
    }

    // 이벤트 바인딩 (한 번만)
    $(window)
        .on('resize', function() {
            winH = $(window).height();
        })
        .on('scroll', handleScroll);
}

/************  main 영역 시작 **************************************/

// mainCycle();
// 메인 영역 자동 슬라이드 함수
function mainCycle() {
    // 전역 변수 선언
    let currentPage = 0;
    let totalPages = 3;
    let isAnimating = false;
    let autoSlideInterval;
    const slideDuration = 4000; // 4초
    const animationDuration = 500; // 0.5초

    // 초기 상태 설정
    function initMainSlide() {
        // 첫 번째 요소만 보이게 설정
        $('.txt-box ul li, .mid-img ul li').hide();
        $('.txt-box ul li:first, .mid-img ul li:first').show();
        
        // 첫 번째 요소 애니메이션 적용
        animateSlide(0);
        
        // 페이저 초기화
        updatePager(0);
    }

    // 슬라이드 애니메이션 함수
    function animateSlide(pageIndex) {
        if (isAnimating) return;
        isAnimating = true;

        // 텍스트 박스 애니메이션
        $('.txt-box ul li').hide();
        $('.txt-box ul li').eq(pageIndex)
            .css({
                opacity: 0,
                marginRight: '30px'
            })
            .show()
            .animate({
                opacity: 1,
                marginRight: '230px'
            }, animationDuration);

        // 중앙 이미지 애니메이션
        $('.mid-img ul li').hide();
        $('.mid-img ul li').eq(pageIndex)
            .fadeIn(animationDuration)
            .css('transform', 'rotate(0deg)')
            .animate({
                transform: 'rotate(15deg)'
            }, 1750, 'linear')
            .animate({
                transform: 'rotate(-15deg)'
            }, 1750, 'linear');

        // 배경 이미지 슬라이드
        const imgBoxHeight = $('.img-box').height();
        $('.img-box ul').animate({
            marginTop: -(imgBoxHeight * pageIndex)
        }, animationDuration);

        isAnimating = false;
    }

    // 페이저 업데이트 함수
    function updatePager(pageIndex) {
        $('.pager-status .num-now').text(String(pageIndex + 1).padStart(2, '0'));
        $('.pager-status .progress-bar').css('width', `${((pageIndex + 1) / totalPages) * 100}%`);
    }

    // 자동 슬라이드 시작
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentPage = (currentPage + 1) % totalPages;
            animateSlide(currentPage);
            updatePager(currentPage);
        }, slideDuration);
    }

    // 자동 슬라이드 정지
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // 이전/다음 버튼 클릭 이벤트
    $('#prev').click(function(e) {
        e.preventDefault();
        stopAutoSlide();
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        animateSlide(currentPage);
        updatePager(currentPage);
        startAutoSlide();
    });

    $('#next').click(function(e) {
        e.preventDefault();
        stopAutoSlide();
        currentPage = (currentPage + 1) % totalPages;
        animateSlide(currentPage);
        updatePager(currentPage);
        startAutoSlide();
    });

    // 초기화 및 자동 슬라이드 시작
    initMainSlide();
    startAutoSlide();
}

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
