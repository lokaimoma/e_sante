$(document).ready(function () {
    // get card width dynamically
    cardWidth = $(".slide-card").width();
    // next-arrow
    $('#next-arrow').click(function () {
        var firstChildAppend = $(".slide-card:first-child()");
        $(".slide-card").animate({ left: -cardWidth }, function () {
            $('.slider-wrap').append(firstChildAppend);
            $(".slide-card").css({
                left: 0,
            })
        })
    });
    // previous-arrow
    $('#previous-arrow').click(function () {
        var lastChildPrepend = $(".slide-card:last-child()");
        $(".slide-card").animate({ left: cardWidth }, function () {
            $('.slider-wrap').prepend(lastChildPrepend);
            $(".slide-card").css({
                left: 0,
            })
        })
    });
});
