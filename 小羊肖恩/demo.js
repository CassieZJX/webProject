// var sheep=document.getElementsByClassName('sheep')[0];
// var num=0;
// var cot=0;//小羊移动的距离
// var sheepAnimate=setInterval(function(){
//     num+=156;
//     if(num==1248){
//         num=0;
//     }
//     sheep.style.backgroundPosition=-num+'px '+0+'px';//注意为负值而且两值中间要有空格
// },30);
// var sheepRun=setInterval(function(){
//     cot=sheep.offsetLeft-5;
//     if(cot<=-156){
//         clearInterval(sheepAnimate);
//         clearInterval(sheepRun);
//         console.log('ok');
//     }
//     sheep.style.left=cot+'px';
// },30);
(function () {
    obj = {
        sheepA: 0,
        sheepR: 0,
        stage: document.getElementsByClassName('stage')[0],
        speed: 5,
        frequency: 80,//定时器的时间
        maxSheep: 8
    }
    function Sheeporigin(data) {
        this.sheep = document.createElement('div');
        data.stage.appendChild(this.sheep);
        this.sheep.className = 'sheep';
        this.sheepA = data.sheepA;
        this.sheepR = data.sheepR;
        this.speedOrigin=data.speed;//拖拽完小羊后小羊仍按照原理的速度往前
        this.frequency = Math.floor(Math.random() * data.frequency) + 20;
        this.speed = data.speed;
        this.top = 0;
        this.sheepW = this.sheep.offsetWidth;
    }
    // var sheep=new Sheeporigin(obj);
    // console.log(sheep);

    init();
    function init() {
        createSheep();
    };
    function createSheep() {
        var timer = setInterval(function () {
            var sheepNum = obj.stage.children.length;
            if (sheepNum > obj.maxSheep - 1) {
                return false;
            } else {
                var sheeporigin = new Sheeporigin(obj);
                sheepRun(sheeporigin);
            }
        }, 1500)
    }
    function sheepRun(sheeporigin) {
        var sheepAnimate = setInterval(function () {
            sheeporigin.sheepA += sheeporigin.sheepW;
            if (sheeporigin.sheepA == (8 * sheeporigin.sheepW)) {
                sheeporigin.sheepA = 0;
            }
            sheeporigin.sheep.style.backgroundPosition = -sheeporigin.sheepA + 'px ' + sheeporigin.top + 'px';//注意为负值而且两值中间要有空格
        }, sheeporigin.frequency);
        //自身移动
        var sheepRun = setInterval(function () {
            sheeporigin.sheepR = sheeporigin.sheep.offsetLeft - sheeporigin.speed;
            if (sheeporigin.sheepR <= -sheeporigin.sheepW) {
                clearInterval(sheepAnimate);
                clearInterval(sheepRun);
                // console.log('ok');
            }
            sheeporigin.sheep.style.left = sheeporigin.sheepR + 'px';
        }, sheeporigin.frequency);

        //拖拽小羊
        sheeporigin.sheep.addEventListener('mousedown', function (e) {
            var event = event || e;
            sheeporigin.top = -128;//使抬起小羊时为两脚平行
            sheeporigin.speed = 0;//让小羊不动
            sheeporigin.x = event.pageX;
            sheeporigin.y = event.pageY;
            document.addEventListener('mousemove', sheepMove);
            function sheepMove(e) {
                var event = event || e;
                sheeporigin.sheep.style.left = sheeporigin.sheep.offsetLeft + (event.pageX - sheeporigin.x) + 'px';
                sheeporigin.sheep.style.top = sheeporigin.sheep.offsetTop + (event.pageY - sheeporigin.y) + 'px';
                sheeporigin.x = event.pageX;
                sheeporigin.y = event.pageY;
            }
            this.addEventListener('mouseup',function(e){//this指向sheeporigin.sheep
                var event = event || e;
                sheeporigin.top=0;                
                sheeporigin.speed=sheeporigin.speedOrigin;
                document.removeEventListener('mousemove',sheepMove);
            })
        })
    }
})()
