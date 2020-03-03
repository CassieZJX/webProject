var canvas = $('#bricksCanvas')[0],
    ctx = canvas.getContext('2d'),
    stop_status = true,//停止键是否有效
    canvas_status = true;
var stop;
//球
var ballRadius = 10;//球的半径
var ballColor = '#f44280';
var x = canvas.width / 2;//球的水平位置
var y = canvas.height - 25;//球的竖直位置
var dx = -2;//球移动的速度
var dy = -2;
//托盘
var paddleHeight = 15;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;//托盘居中的位置
var rightPressed = false;//开始游戏后，控制小球右移
var leftPressed = false;//开始游戏后，控制小球左移
//砖块
var brickRowCount = 1;//5行
var brickColumnCount = 6;//6列
var brickWidth = 70;//砖块宽度
var brickHeight = 20;//砖块高度
var brickPadding = 6;//砖块间的间距
var brickOffsetTop = 35;//最上面砖块离上面得分的距离
var brickOffsetLeft = 15;//最左面砖块离canvas左边的距离
//得分和生命值
var score = 0;
var lives = 3;
//初始化二维数组，储存砖块信息 status:1表示砖块显示 0表示砖块消失
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//画球
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
};
//画滑盘
function drawPalle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#00f";
    ctx.fill();
    ctx.closePath();
};
//画砖块
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#8f63cc";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//分数
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#f44280";
    ctx.fillText('Score:' + score, 15, 20);
}
//生命值
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#f44280";
    ctx.fillText('Lives:' + lives, canvas.width - 70, 20);
}
//Game over
function drawGo() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#f44280";
    ctx.fillText('GAME OVER', 200, 200);
}
//win
function drawWin() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#f44280";
    ctx.fillText('You Are Win!', 200, 200);
}
//砖块消失 小球碰撞砖块的条件
function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickColumnCount * brickRowCount) {
                        drawWin();
                        document.location.reload();
                        x = canvas.width / 2;
                        y = canvas.height -30;
                        dx = 3;
                        dy = -3;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }
        }
    }
}
//运动
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPalle();
    drawBricks();
    drawScore();
    drawLives();
    collisionDetection();    
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    //托盘接不住小球时
    else if (y + dy > canvas.height - (ballRadius + paddleHeight)) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (lives == 0) {
                drawGo();
                $('.start').attr('flage', 'flage');
                lives = 4;
                score = 0;
                stop_status = false;
                return;
            } 
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;

            }
        }
    }
    //控制左右键盘接住小球
    if(rightPressed && paddleX<canvas.width-paddleWidth){
        paddleX+=5;
    }
    else if(leftPressed&&paddleX>0){
        paddleX-=5;
    }
    x+=dx;
    y+=dy;
    stop=requestAnimationFrame(draw);
}
function mouseMoveHandler(e){
    var relativeX=e.clientX-canvas.offsetLeft;
    if(relativeX>0&&relativeX<canvas.width){
        paddleX=relativeX-paddleWidth/2;
    }
}
function keyDownHandle(e){
    if(e.keyCode==39){
        rightPressed=true;
    }
    else if(e.keyCode==37){
        leftPressed=true;
    }
    else if(e.keyCode==32){
        if(stop_status){
            window.cancelAnimationFrame(stop);
            canvas_status=false;
        }
        else{
            stop=requestAnimationFrame(draw);
            canvas_status=true;            
        }
    }
}
function keyUpHandle(e){
    if(e.keyCode==39){
        rightPressed=false;
    }
    else if(e.keyCode==37){
        leftPressed=false;
    }
}
$(function () {
    drawBall();
    drawPalle();
    drawBricks();
    drawScore();
    drawLives();
    $('.start').click(function(){
        stop_status=true;
        //判断游戏结束是否可以继续点击游戏
        if($('.start').attr('flage')=='flage'){
            for (c = 0; c < brickColumnCount; c++) {
                for (r = 0; r < brickRowCount; r++) {
                   bricks[c][r].status=1;
                }
            }
            $('.start').attr('flage','');
            draw();
            document.addEventListener('mousemove',mouseMoveHandler,false);
            document.addEventListener('keydown',keyDownHandle,false);
            document.addEventListener('keyup',keyUpHandle,false);
        }
    })
})