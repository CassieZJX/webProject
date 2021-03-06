   // 获取按钮
   var startBtn = document.querySelector("#start");

   // 菜单
   var menu = document.querySelector("#menu");
   
   //速度
   var speed=100;

   //倒计时
   var countDownDiv = document.querySelector("#countDown");

   // 存放狼的div
   var wolfsDiv = document.querySelector("#wolfs");

   // 游戏结束弹框gameOver
   var gameOverDiv = document.querySelector("#gameOver");

   // 获取存放分数的div->scoring
   var scoring = document.querySelector("#scoring");

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

   // 用来创建狼的定时器
   var createWolfTimer = null;

   // 给按钮添加点击事件
   startBtn.onclick = function () {

       // 隐藏menu菜单
       menu.style.display = "none";

       // 开始倒计时
       var countDownWidth = countDownDiv.offsetWidth;

       var timer = setInterval(function () {
           // 每10毫秒减一
           countDownWidth--;
           // 重新给倒计时div赋值宽度，实现倒计时效果
           countDownDiv.style.width = countDownWidth + "px";
           if (countDownWidth <= 0) {
               // 游戏结束，清除定时器
               clearInterval(timer);
               // 清除创建狼的定时器
               clearInterval(createWolfTimer);
               // 显示弹框
               gameOverDiv.style.display = "block";

               alert("游戏结束");
           }

       }, 100)

       // 创建狼
       // 用来记录上一个随机数(洞口上一次出现的位置)
       var num = -9999999;

       createWolfTimer = setInterval(function () {
           // 随机数（位置随机）
           var rand = randFn(0, wolfStartArr.length - 1);//0 1 1
           // 随机0~100的数（类型随机）
           var randType = randFn(0, 100);
           if (num == rand) {
               return;
           }
           num = rand;

           var wolf = new Image();

           //设置狼出现的位置
           wolf.style.left = wolfStartArr[rand].left;

           wolf.style.top = wolfStartArr[rand].top;

           // 随机狼的类型(小灰灰or灰太狼)
           randType > 90 ? wolf.type = "x" : wolf.type = "h";

           // 图片的下标
           wolf.index = 0;

           wolf.src = "img/" + wolf.type + wolf.index + ".png";

           // 插入到divs里面
           wolfsDiv.appendChild(wolf);

           //用来狼出现的动画(通过计时器刷图，实现动画)
           wolf.upTimer = setInterval(function () {
               wolf.index++;
               if (wolf.index <= 5) {
                   wolf.src = "img/" + wolf.type + wolf.index + ".png";
               } else {
                   clearInterval(wolf.upTimer);
                   wolf.downTimer = setInterval(function () {
                       wolf.index--;
                       if (wolf.index <= 0) {
                           clearInterval(wolf.downTimer);
                           wolfsDiv.removeChild(wolf);
                       }
                       wolf.src = "img/" + wolf.type + wolf.index + ".png";
                   }, 100)
               }
           }, 150)

           var bol = true;
           // 给wolf添加点击事件
           wolf.onclick = function () {
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
                   scoring.innerHTML = parseInt(scoring.innerHTML) - 10;

               } else if (wolf.type == "h") {
                   // 加10分
                   scoring.innerHTML = parseInt(scoring.innerHTML) + 10;
               }
           }
       }, 800)
   }

   // 随机函数
   function randFn(min, max) {
       return parseInt(Math.random() * (max - min + 1) + min);
   }
   // 阻止默认事件
   document.onmousedown = function (ev) {
       var e = ev || window.ev;
       e.preventDefault();
   }