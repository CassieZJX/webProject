var wrap = $('.wrapper');
var oLi = $('li');
var len = oLi.length;
var deg = 360 / len;
setTimeout(function () {
    change();
}, 100);
$('.btn').on('click', function () {
    change();
});
function change() {
    wrap.toggleClass('open');
    for (var i = 0; i < len; i++) {
        var d = i * deg;
        wrap.hasClass('open') ? rotateZ(oLi[i], d) : rotateZ(oLi[i], -360);
        // console.log(d);
    }
}
function rotateZ(dom, deg) {
    $(dom).css({
        'transform': 'rotateZ(' + deg + 'deg)'
    })
        .find('div').css({
            'transform': 'rotateZ(' + -deg + 'deg)'     //将文本调正       
        })
}
