$(document).ready(function () {
    $('[class ^= main_btn], li:contains("расписания")').on('click', function () {
        $('.overlay').fadeToggle(200, function () {
            $('.modal').css('display', 'block').animate({
                top: '15%'
            }, 700);
        });
    });

    $('.close').on('click', function () {
        $('.modal').animate({
            top: '-80%'
        }, 500, function () {
            $('.modal').css('display', 'none');
            $('.overlay').fadeOut(200);
        });
    });
});