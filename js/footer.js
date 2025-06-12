$(function () {

    snsOpacity();
});

//// 전역함수모음 ////////////////////////////////////////////

// -- snsOpacity(); ---------------------------------------
// sns 아이콘에 hover 했을 때 opacity 변경
function snsOpacity() {
    $('footer .sns a').css({

        //기본세팅 - transition
        transition: 'all 0.7s'
    }).hover(function () {
        $(this).css({
            opacity: '1',
        });
    }, function () {
        $(this).css({
            opacity: '0.7',
        });
    });
}