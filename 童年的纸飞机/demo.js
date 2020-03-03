$(function () {
    //翻转
    $('.send').click(function () {
        setTimeout(function () {
            $('#plane').removeClass('front');
            $('#wind_container').removeClass('beginning');
            $('.curvable').addClass('curved');
            setTimeout(function(){
                $('#wind_container').addClass('hover')
            },2800);
        },200);
    })
})