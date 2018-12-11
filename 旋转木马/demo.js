var oImg = $('img');
var oWrap = $('.wrapper');
var len = oImg.length;
var deg = 360 / len;
var body = $('body');
var timer;

init();
drag();
function init() {
    for (i = 0; i < len; i++) {
        var img = $(oImg[i]);
        //旋转再平移
        img.css({
            'transform': 'rotateY(' + i * deg + 'deg) translateZ(400px)',
            'transition': 'transform 1s' + (len - 1 - i) * 0.1 + 's'
        })
    }
}
function drag() {
    var lastX, lastY, nowX, nowY, disX, disY, roX=0, roY = 0;
    body.on('mousedown', function (e) {
        clearInterval(timer);
        var event = e || window.event;
        lastX = event.clientX;//鼠标落下的位置
        lastY = event.clientY;
        body.on('mousemove', function (e) {
            var event = e || window.event;
            nowX = event.clientX;
            nowY = event.clientY;
            // console.log(nowX,nowY);
            disX = nowX - lastX;//移动的距离
            disY = nowY - lastY;
            // console.log(disX,disY);            
            roY += disX * 0.2;//旋转的角度(*2是为了不让动作太大)
            roX -= disY * 0.2;
            // console.log(roX,roY);            
            oWrap.css({
                'transform': 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)',
                'cursor': 'move'
            })
            lastX = nowX;
            lastY = nowY;
        })
        body.on('mouseup', function (e) {
            body.off('mousemove');//鼠标解绑
            clearInterval(timer);
            timer = setInterval(function () {
                disX *= 0.98;
                disY *= 0.98;
                roY += disX * 0.2;
                roX -= disY * 0.2;
                oWrap.css({
                    'transform': 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)',
                    'cursor': 'pointer'
                })
            }, 20);
        });
        return false;
    });
}