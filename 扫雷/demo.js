//点击开始游戏-->动态生成100个小格--100个div
//左击按钮事件-->碰到雷-->游戏结束
//           -->没碰雷-->显示数字{0：扩散；非0：显示周围雷数}
//右击按钮事件-->先取消鼠标右键默认事件-->插旗(再按一次取消插旗)
//           插旗-->正确插到雷-->剩余旗数-1
//               -->插错位置---->剩余旗数+1
//剩余旗数==0,游戏获胜
//难点：显示地雷数，遇0扩散

var startBtn = document.getElementById('btn'),
    box = document.getElementById('box'),
    flatBox = document.getElementById('flatBox'),
    alert = document.getElementById('alert'),
    alertImg = document.getElementById('alertImg'),
    closebtn = document.getElementById('close'),
    score = document.getElementById('score');
var minesNum;//总旗数
var minesOver;//剩余旗数
var mineMap = [];//标记地雷，防止生成地雷位置重复   
var block;//生成草地的样式div
var startbtnBool = true;//点击开始游戏不会重复生成100个div的锁
bindEvent();
//点击事件
function bindEvent() {
    //点击开始游戏，初始化游戏界面
    startBtn.onclick = function () {
        if (startbtnBool) {
            minesOver = 10;//每次开始，重置初始剩余旗数为10
            box.style.display = 'block';
            flatBox.style.display = 'block';
            score.innerHTML = minesOver;//将剩余旗数显示在score中
            init();
            startbtnBool = false;//游戏过程中，点击开始游戏无效
        }
    };
    //取消鼠标右键默认事件
    //点击最后一个旗的时候，鼠标右键恢复默认事件，因为剩余旗数为0，box变为'none'
    box.oncontextmenu = function () {
        return false;
    }
    //获取鼠标点击源事件
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            leftClick(event);
        } else if (e.which == 3) {
            rightClick(event);
        }
    };
    //关闭按钮，游戏主界面消失
    closebtn.onclick = function () {
        alert.style.display = 'none';
        box.style.display = 'none';
        box.innerText = '';//清空box的内容，否则会覆盖到下一次生成的100个div上
        startbtnBool = true;//恢复开始游戏的锁
    }
}
//初始化草地界面，地雷位置
function init() {
    minesNum = 10;
    minesOver = 10;
    //生成100个小草地
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block');//赋上样式
            con.setAttribute('id', i + '-' + j);//赋上id值
            box.appendChild(con);
            mineMap.push({ mine: 0 });//后续有地雷的将mine改为1
        }
    }
    //生成minesNum个地雷
    block = document.getElementsByClassName('block');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        //随机数可能出现重复，只有未被标记的位置才能设为地雷
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('islei');
            minesNum--;//地雷数相应减1，为0时跳出循环
        }
    }
}
//鼠标左击事件
function leftClick(dom) {
    //插旗的情况下不允许左击
    if (dom.classList.contains('flag')) {
        return;
    }
    var islei = document.getElementsByClassName('islei');
    // for (var i = 0; i < islei.length; i++) {
    //     console.log(islei[i]);
    // }
    //左击点到地雷
    if (dom && dom.classList.contains('islei')) {
        console.log('GameOver');
        //显示所有地雷位置
        for (var i = 0; i < islei.length; i++) {
            islei[i].classList.add('show');
        }
        //出现游戏失败的弹框
        setTimeout(function () {
            alert.style.display = 'block';
            alertImg.style.backgroundImage = 'url("img/over.PNG")';
        }, 800)
    }
    //没点到地雷显示周围地雷数
    else {
        var n = 0;
        //不是0的时候,找到周围地雷数，显示地雷数
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        // console.log(posArr[0],posArr[1]);
        dom && dom.classList.add('num');
        //查找周围8个格子是否有地雷，有的话n+1;
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('islei')) {
                    n++;
                }
            }
        }
        //格子内显示周围地雷数
        dom && (dom.innerHTML = n);
        //0的时候，扩散,递归
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        //检查过的不需要再检查
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}
//鼠标右击事件
function rightClick(dom) {
    //已显示数字不能右击插旗
    if (dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('flag');//切换
    //是地雷且插对，minesOver--
    if (dom.classList.contains('islei') && dom.classList.contains('flag')) {
        minesOver--;
    }
    //是地雷但没插旗子，minesOver++
    if (dom.classList.contains('islei') && !dom.classList.contains('flag')) {
        minesOver++;
    }
    //显示剩余旗子数
    score.innerHTML = minesOver;
    //游戏胜利
    if (minesOver == 0) {
        setTimeout(function () {
            alert.style.display = 'block';
            alertImg.style.backgroundImage = 'url("img/success.PNG")'
        }, 800)
    }
}