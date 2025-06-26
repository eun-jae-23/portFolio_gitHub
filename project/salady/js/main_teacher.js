//main.js 
///구현 최종 목표 (본인 작성)


    /* 
    
    제이쿼리 구현해야할 것 설계
    
    1. 자동메인페이지 UI변경 (요소 변경 및 슬라이드구현)
    2. 페이저 버튼 누르면 자동메인페이지 UI변경 멈추고(stop메서드 써야 하나요?) 슬라이드 이동 후에 자동슬라이드 재개
    
    // const bgColor = ['#008278', '#f1a94b', '#a2b570'];
    
    //페이저 설명 : 왼쪽 버튼을 누르면 페이지 -1, 오른쪽 버튼을 누르면 페이지 +1
    //요소들이 총 3개이므로,  얻어서 페이저가 전체 요소 갯수와 같아지면 0이 되도록 해야하나?
    
    
    1.자동메인페이지 UI변경 (요소 변경 및 슬라이드구현)
    //기본 틀 : 4초마다 main .txt-box ul li, main .mid-img ul li, main .txt-box 요소가 페이지 바뀔 때 마다 다음 형제요소로 바뀌어야함 - setInterval 어떻게 사용해야할 지 모르겠음
    
    //0초 시점(첫번째 페이지-인덱스 기준 page 0) - 처음 문서가 불러와졌을 때 기본 세팅
    //main .img-box ul li, main .txt-box ul li의 첫번째 요소만 보여줘야 하는데, 어떤식으로 보여지냐면 문서가 불러와지자마자 (1).mid-img ul li는 fadeIn(500)효과로 보여지면서 나머지 남은 3.5초동안 중심점 요소 가운데로 설정된 상태에서 좌,우 번갈아가며 15도씩 회전,(2)main .txt-box ul li는 opacity:0, marginright:30px 에서 animate로 0.5초동안 투명도 opacity:1이 되고 marginright:230px이 되게 함
    (3) main .txt-box ul li, main .mid-img ul li 의 첫번째 요소 외 형제요소들은 모두 (hide) 상태
    
    //왼쪽 사진 슬라이드 : main .img-box ul li는 첫번째 요소만 .img-box 영역에 보여지게 세팅 된 상태이며, 슬라이드 되게 구현할 것이라 다른 요소 숨김처리 안하고 marginTop 및 appendTo, prependTo로 요소들 조절하면서 페이지 바뀔 때 마다 구현할 것임
    
    
    //4초 (두번째 페이지 - 인덱스 기준 page1)
    ////main .txt-box ul li, main .mid-img ul li 의 두 번째 요소만 보여줘야 하는데,
    //어떤식으로 보여지냐면 4초가 되자마자
    (1).mid-img ul li는 fadeIn(500)효과로 보여지면서 나머지 남은 3.5초동안 중심점 요소 가운데로 설정된 상태에서 좌,우 번갈아가며 15도씩 회전,(2)main .txt-box ul li는 opacity:0, marginright:30px 에서 animate로 0.5초동안 투명도 opacity:1이 되고 marginright:230px이 되게 함
    (3)  main .txt-box ul li, main .mid-img ul li 의 두번째 요소 외 형제요소들은 모두 (hide) 상태
    
    //페이저 변경!
    //.pager-status의 .num-now 텍스트가 02(현재 페이지 기준으로 .num-now의 텍스트는 바뀌게 하려고 함)가 되어야 하며, .progress-bar의 너비가 .status-bar의 2/3 (약 66%) 너비가 되어야 함 (즉 첫번째 페이지일 때는 기본값으로 너비 1/3이고, 두번째는 2/3, 세번째는 3/3인 것!)
    
    //왼쪽 사진 슬라이드 : main .img-box ul li는첫번째 요소가 위로 올라가면서 두 번째 요소가 .img-box 영역에 보여지는 슬라이드가 구현되어야 함 
    
    
    2. 페이저 버튼 누르면 자동메인페이지 UI변경 멈추고(stop메서드 써야 하나요?) 슬라이드 이동 후에 자동슬라이드 재개
    
    //2-1. 기존에 진행되고 있던 자동메인페이지 UI변경 부분 멈춰야 하나..?
    
    //2-2. prev,next 눌렀을 때 
    //페이저 변경!
    //.pager-status의 .num-now 텍스트가 어떤 버튼 누르냐에 따라 달라짐, .progress-bar의 너비가 .status-bar의 너비가 어떤 버튼 누르냐에 따라 달라짐
    
    //해당 페이지의 요소 및 나머지 형제요소 아래와 같이 처리!
    (1).mid-img ul li는 fadeIn(500)효과로 보여지면서 나머지 남은 3.5초동안 중심점 요소 가운데로 설정된 상태에서 좌,우 번갈아가며 15도씩 회전,(2)main .txt-box ul li는 opacity:0, marginright:30px 에서 animate로 0.5초동안 투명도 opacity:1이 되고 marginright:230px이 되게 함
    (3)  main .txt-box ul li, main .mid-img ul li 의 두번째 요소 외 형제요소들은 모두 (hide) 상태
    
    //왼쪽 사진 슬라이드 : prev 버튼 눌렀을 때는 main .img-box ul li는 버튼 누르기 전에 보여지는 li가 위로 올라가면서 그 다음 li가 아래에서 위로 올라와지며 .img-box 영역에 보여지는 슬라이드가 구현되어야 함, next버튼 눌렀을 때는 반대
    
    */





////선생님 구현 파트 //////////////////////////////////////////////////////////////

///전역변수 
var cnt = 0;


$(function(){
    //$('.img-box li').first().show();
    //$('.txt-box li').first().show();
    //$('.mid-img li').first().show();

    //최초 애니메이션!
    /* $('.txt-box li').eq(cnt).fadeIn();
    $('.mid-img li').eq(cnt).fadeIn(); */

    //최초실행!!!!
    fadeShow();

    var slideHeight = $('.img-box ul li').height();
    console.log(slideHeight);

    $('body').click(test);

    /* $('.img-box ul').animate({
        marginTop: -slideHeight
    }, 800, function (){
        cnt++;
        fadeShow();

        //왼쪽 슬라이드의 다음을 위한 준비
        $('.img-box ul').append($('.img-box ul li').first());
        $('.img-box ul').css('margin-top',0);
    }); */
});

//요소의 등장만 있으니까 사라지는 것도 넣으세요!
function fadeShow (){

    $('.txt-box li, .mid-img li').hide();

    $('.txt-box li').eq(cnt).fadeIn(600);
    $('.mid-img li').eq(cnt).fadeIn(600);
}


function test (){
    slideHeight = $('.img-box ul li').height();

    $('.img-box ul').animate({
        marginTop: -slideHeight
    }, 800, function (){
        cnt++;
        if (cnt === 3) cnt=0;

        fadeShow();

        //왼쪽 슬라이드의 다음을 위한 준비
        $('.img-box ul').append($('.img-box ul li').first());
        $('.img-box ul').css('margin-top',0);
    });
}