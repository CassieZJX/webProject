var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (var i = 65; i <= 122; i++) {
    if (i > 90 && i < 97) {
        continue;
    }
    arr.push(String.fromCharCode(i));
}
// console.log(arr);//arr[数字+字母]
createCanvas();
var canvasStr, value;

function createCanvas() {
    var len = arr.length;
    canvasStr = '', value = '';
    //生成验证码
    for (var i = 0; i < 6; i++) {
        var random = arr[Math.floor(Math.random() * len)];
        // console.log(random);
        canvasStr += random + " ";
        value += random;
    }
    // console.log(canvasStr);
    //生成canvas
    var canvas = $("#canvasStr")[0];
    var ctx = canvas.getContext('2d');
    var x = canvas.width / 2;
    var oImg = new Image();
    oImg.src = './img/bg.jpg';
    oImg.onload = function () {
        var pattern = ctx.createPattern(oImg, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = '46px Roboto Slad';
        ctx.setTransform(1, -0.12, 0.2, 1, 0, 12);//水平旋转 水平倾斜 垂直倾斜 垂直缩放 水平移动 垂直移动 
        ctx.fillText(canvasStr, x, 60);
        // console.log(canvasStr);
    };
}
//提交按钮判断对错
$('.submit').on('click', function () {
    if (value == $('.input').val()) {
        $('.pic').css({
            'backgroundImage': 'url("./img/正确.svg")',
            'display': 'inline-block'
        });
    } else {
        $('.pic').css({
            'backgroundImage': 'url("./img/错误.svg")',
            'display': 'inline-block'
        });
        $('.errorText').css({
            'display': 'inline-block'
        });
        createCanvas();
    }
});
//刷新验证码
$('.refresh').on('click', function () {
    setInterval(createCanvas(), 1000);
});
//聚焦输入框的时候，显示错误的信息消失
$('.input').focus(function () {
    //第一种
    // $('.pic').css({
    //     'display': 'none'
    // });
    // $('.errorText').css({
    //     'display': 'none'
    // });
    //第二种
    // $('.errorText').add($('.pic')).css({
    //     'display': 'none'
    // });
    //第三种
    $('.errorText').add($('.pic')).fadeOut(100);

})
