var countDown = $('#countDown');
var len = countDown.width();
var wolfsDiv = document.querySelector("#wolfs");
var scoring = $('#scoring');
var start = $('#start');
var gameOver = $('#gameOver');
var menu = $('#menu');
var speed = 500;//速度
var upspeed = 150;
var downspeed = 100;
var createWolfTimer=null;
// 用一个对象，存放灰太狼出现的位置
var wolfStartArr = [
    { left: "98px", top: "115px" },
    { left: "17px", top: "160px" },
    { left: "15px", top: "220px" },
    { left: "30px", top: "293px" },
    { left: "122px", top: "273px" },
    { left: "207px", top: "295px" },
    { left: "200px", top: "211px" },
    { left: "187px", top: "141px" },
    { left: "100px", top: "185px" }
];
//倒计时
start.on('click', function () {
    menu.css('display', 'none');
    var timer = setInterval(function () {
        if (len > 0) {
            len--;
            countDown.css('width', len + 'px');
        } else {
            clearInterval(timer);
            clearInterval(createWolfTimer);
            gameOver.css('display', 'block');
        }
    }, 100);

//创建狼
var num = -1;
createWolfTimer = setInterval(function () {
    var rand = randFn(0, wolfStartArr.length - 1);
    // console.log(rand);
    var type = randFn(0, 100);
    if (num == rand) {
        return;
    };
    num = rand;
    var wolf = new Image();

    //出现的位置
    wolf.style.left = wolfStartArr[rand].left;
    wolf.style.top = wolfStartArr[rand].top;
    console.log(wolf.style.left);
    console.log(wolf.style.top);
    type > 90 ? wolf.type = 'x' : wolf.type = 'h';
    wolf.index = 0;
    wolf.src = 'img/' + wolf.type + wolf.index + '.png';
    wolfsDiv.appendChild(wolf);
    console.log(wolfs)
    //出现的动画
    wolf.upTimer = setInterval(function () {
        wolf.index++;
        if (wolf.index <= 5) {
            wolf.src = 'img/' + wolf.type + wolf.index + '.png';
        } else {
            clearInterval(wolf.upTimer);
            wolf.downTimer = setInterval(function () {
                wolf.index--;
                if (wolf.index <= 0) {
                    clearInterval(wolf.downTimer);
                    wolfsDiv.removeChild(wolf);
                }
                wolf.src = 'img/' + wolf.type + wolf.index + '.png';
            }, downspeed);
        }
    }, upspeed);
    //点击拍打成功得分
    var bol=true;
    wolf.onclick =function () {
        wolf.index = 5;
        if (bol == true) {
            // 清除定时器(狼出现，狼消失)
            clearInterval(wolf.upTimer);
            clearInterval(wolf.downTimer);
            wolf.hitTimer = setInterval(function () {
                wolf.index++;
                if (wolf.index >= 9) {
                    clearInterval(wolf.hitTimer);
                    // 移除wolf
                    wolfsDiv.removeChild(wolf);
                }
                wolf.src = "img/" + wolf.type + wolf.index + ".png";
            }, 100)
        }
        bol = false;
        if (wolf.type == "x") {
            // 减10分
            scoring.text(parseInt(scoring.text()) - 10);

        } else if (wolf.type == "h") {
            // 加10分
            scoring.text(parseInt(scoring.text()) + 10);
        }
    }
}, speed)
});

// 随机函数
function randFn(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
}