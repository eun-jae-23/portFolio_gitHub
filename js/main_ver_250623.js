// main_ver_250623.js
// 메인 슬라이드 수정

// 메인 슬라이드 수정

///전역변수 
let cnt = 0; //현재 페이지
const bgColor = ['#008278', '#f1a94b', '#a2b570'];
const progressBar = ['33.33%', '66.66%', '100%'];
let stat = 0; //광클금지, 0-클릭허용/1-클릭금지

let slideHeight = 0;  //왼쪽 이미지 박스 li의 높잇값 담을 변수 

$(function () {

    // 화면 로딩 되었을 때 첫번째 .txt-box와 .mid-img 등장 
    // 초기설정 - display:none 이 css에 설정되어 있음
    // 화면 로딩 후 바로 등장 
    $('main .txt-box li').first().fadeIn(800);
    $('main .mid-img li').first().fadeIn(800);

    //최초 자동실행 
    autoSlide();


    //다음버튼을 클릭했을 때!
    $('#next').on('click', function (e) {

        e.preventDefault();

        //광클 금지 
        if (stat === 1) return false;
        stat = 1;

        nextPage(1);
    });

    $('#prev').on('click', function (e) {

        e.preventDefault();

        //광클 금지 
        if (stat === 1) return false;
        stat = 1;

        prevPage();
    });

});


///다음 클릭 시 실행 
///다음 페이지 이동이 필요한 경우 - 자동 슬라이드, #next 클릭 시
function nextPage(c) {
    //매개변수 c : 0-자동실행/1-다음버튼 클릭 

    if (c === 1) {
        stopSlide();
    }

    slideHeight = $('main .img-box li').height();
    cnt++;
    if (cnt === 3) cnt = 0;

    //1. 왼쪽 img-box의 이미지 슬라이드 
    $('main .img-box ul').animate({
        marginTop: -slideHeight
    }, 800, function () {
        //다음을 위한 준비 (롤링 슬라이드를 위해)
        $(this).append($('.img-box ul li').first()).css({
            marginTop: 0
        });

        //2,3번 등장!
    });

    // 2, 3번은 1번 animate()의 콜백함수로 사용해도 됩니다. 

    //2. 오른쪽 txt-box의 내용변경, 배경색 변경 
    $('main .txt-box').css({
        backgroundColor: bgColor[cnt]
    });
    $('main .txt-box li').hide().eq(cnt).fadeIn(800);

    //3. 가운데 mid-img 등장
    $('main .mid-img li').hide().eq(cnt).fadeIn(800);

    //4. 페이저 변경 - 변수 cnt 값을 함수 호출 시 매개변수로 전달
    pager(cnt);

    // 클릭 상태 변경
    //stat = 0;
    setTimeout(function () {
        stat = 0;
    }, 3000);

}

//이전 클릭 시 실행 
function prevPage() {
    // 자동 슬라이드 일시 정지
    stopSlide();

    // 항상 보이는 li의 높이로 계산
    slideHeight = $('main .img-box li:visible').height();
    cnt--;
    if (cnt < 0) cnt = 2;

    // 1. 왼쪽 이미지 슬라이드(맨 마지막 li를 앞으로 옮기고, marginTop을 -slideHeight로 만든 뒤 0으로 애니메이션)
    $('main .img-box ul').prepend($('main .img-box ul li').last()).css({
        marginTop: -slideHeight
    }).animate({
        marginTop: 0
    }, 800);

    // 2. 오른쪽 텍스트 박스 배경색, 텍스트 변경
    $('main .txt-box').css({
        backgroundColor: bgColor[cnt]
    });
    $('main .txt-box li').hide().eq(cnt).fadeIn(800);

    // 3. 가운데 mid-img 변경
    $('main .mid-img li').hide().eq(cnt).fadeIn(800);

    // 4. 페이저 변경
    pager(cnt);

    // 5. 클릭 방지 해제
    setTimeout(function () {
        stat = 0;
    }, 3000); // 클릭 방지 시간은 필요에 따라 조정
}


// 페이저 변경 함수 
function pager(num) {
    $('.pager-status .num-now').text('0' + (num + 1));
    $('.pager-status .progress-bar').css({
        width: progressBar[num]
    });
}

// 자동실행 함수
let intCall; //인터벌을 담을 변수!
function autoSlide() {
    intCall = setInterval(function () {
        nextPage(0); //자동실행 시 전달할 매개변수는 0!!!!
    }, 4000);
}

// 자동실행 중단, 일정 시간 후 인터벌 재실행
var timeCall;
function stopSlide() {
    clearInterval(intCall);

    //타임아웃 제거 
    //클릭한 시점에서 다시 타임아웃이 설정되도록 하기 위해!
    clearTimeout(timeCall);

    //타임아웃 세팅 - 인터벌 재가동!
    timeCall = setTimeout(function () {
        autoSlide();
    }, 3000);
}

