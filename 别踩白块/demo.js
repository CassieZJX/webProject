var main = $('.main'),
    speed = 5,
    num = 0,
    timer,
    flag = true,//是否可以继续点击
    colors = ['#1aab8a', '#e15650', '#121B29', '#80a84e'];
    clickStart();
    
//初始点击 开始
function clickStart() {
    $('a').on('click', function () {
        //运动，动态创建白块
        if (main.children().length) {
            main.html('');
        }
        $('a').css('display', 'none');
        $('.gameRule').css('display','none');
        move();
    })
}
//动态生成一行白块
function cDiv() {
    var oDiv = $('<div></div>');/* 创建一行div */
    var index = parseInt(Math.random() * 4);/* 取0到4 */
    oDiv.attr('class', 'row');/* 起类名 */
    for (var j = 0; j < 4; j++) {/* 每行再生四个div */
        var iDiv = $('<div></div>');
        oDiv.append(iDiv);
    }
    if (main.children().length == 0) {
        main.append(oDiv);
    } else {//已有一行，插入到前面
        oDiv.insertBefore(main.children()[0]);
    }
    var clickDiv = oDiv.children()[index];
    $(clickDiv).css('background-color', colors[index]);//给随机的一个DIV赋上颜色
    $(clickDiv).attr('class', 'i');
}
//点击有颜色的方块--》判断是否点击正确
//下落过程是否有带颜色的方块消失  
function bindEvent() {
    main.on('click', function (e) {
        if (flag) {
            var event = e || window.event;//找到触发原事件
            if (event.target.className == 'i') {//若当前为点击的方块
                event.target.style.backgroundColor = '#bbb';//改变方块颜色为深灰色
                event.target.className = '';//点击完置空，方便后面判断是否有有颜色的方块碰到底边
                num++;
            } else {//如果点击不对
                main.css('top', '0px');
                alert('游戏结束，当前得分： ' + num);
                clearInterval(timer);//游戏失败不能再玩，即方块不会再下落，清除计时器
                flag = false;
            }
            if (num % 10 == 0) {//速度缓慢增加
                speed++;
            }
        }
    })
}
//控制下落运动
function move() {
    timer = setInterval(function () {
        var step = parseInt(main.css('top')) + speed;
        main.css('top', step + 'px');
        if (parseInt(main.css('top')) >= 0) {
            cDiv();
            main.css({
                'top': -150 + 'px'

            })
        }
        //未点击的方块碰到底部游戏结束
        var len = main.children().length;
        if (len == 6) {
            for (var j = 0; j < 4; j++) {
                if (main.children()[len - 1].children[j].className == 'i') {//找到最后一行
                    main.css('top', '0px');
                    alert('游戏结束，当前得分： ' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            $(main.children()[len - 1]).remove();//移除最后一行，防止main被越撑越大
        }
    }, 20);
    bindEvent();
}