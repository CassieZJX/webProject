//0-9 A-Z a-z 总共62个
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (var i = 65; i <= 122; i++) {
    if (i > 90 && i < 97) {//91-96为符号
        continue;
    }
    arr.push(String.fromCharCode(i));
    // console.log(arr);
}
//createCanvas
//submit点击--判断{true：pic-->正确.svg}----->createCanavas
//               {false：pic-->错误.svg  errorText}
//refresh-->createCanavas
createCanvas();
var canvasStr, value;
function createCanvas() {
    canvasStr = '';
    value = '';
    //生成验证码
    for (var i = 0; i < 6; i++) {
        var a = arr[Math.floor(Math.random() * arr.length)];
        canvasStr += a + ' ';
        value += a;//用于将用户输入的与value对比是否输入正确
    }
    // console.log(arr, canvasStr);
    var canvas = $('#canvasStr')[0],
        ctx = canvas.getContext('2d'),
        x = canvas.width / 2,
        oImg = new Image();
    oImg.src = './img/bg.jpg';
    oImg.onload = function () {
        var pattern = ctx.createPattern(oImg, 'repeat');//在指定的方向内重复指定的元素
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = '46px Roboto Slad';
        ctx.setTransform(1, -0.12, 0.2, 1, 0, 12);//水平旋转 水平倾斜 垂直倾斜 垂直缩放 水平移动 垂直移动 
        ctx.fillText(canvasStr, x, 60);
    }
}
//显示结果
$('.submit').on('click', function () {
    showResult();
});
//刷新重新更换验证码
$('.refresh').on('click', function () {
    createCanvas();
});
//输入的时候没有×
$('.input').focus(function(){
    $('.errorText').add($('.pic')).fadeOut(100);
})
function showResult() {
    var inputValue = $('.input').val();
    var result = resultFun(inputValue);
    if (result) {
        $('.pic').css({
            'display': 'inline-block',
            'backgroundImage': 'url("./img/正确.svg")'
        });
    } else {
        //显示错误信息
        $('.errorText').css({
            'display': 'inline-block'
        })
        //显示错误
        $('.pic').css({
            'display': 'inline-block',
            'backgroundImage': 'url("./img/错误.svg")'
        });
        createCanvas();
    }
}
function resultFun(inputValue) {
    if (inputValue == value) {
        return true;
    } else {
        return false;
    }
}
