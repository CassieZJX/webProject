var items = $('.slider-item'),
    prev = $('.prev'),
    next = $('.next'),
    flag = true,//检测动画是否结束
    num = 0;
init();
function init() {
    for (var i = 0; i < items.length; i++) {
        var item = $(items[i]);
        var width = parseInt($(items[i]).css('width'));
        item.css({
            'left': i * width + 'px'
        });
        var itemChildren = item.children();
        for (var j = 0; j < itemChildren.length; j++) {
            itemChildren.css({
                'backgroundPositionX': -i * width + 'px'
            })
        }
    }
    bindEvent();
}
function bindEvent() {
    prev.on('click', function () {
        if (flag) {
            change(-1);
        }
    });
    next.on('click', function () {
        if (flag) {
            change(1);
        }
    });
}
function change(type) {
    //上一张
    if (type == -1) {
        // console.log(num);
        var rotate = ++num * 90;
        // console.log(num,rotate);
    } 
    //下一张
    else if (type == 1) {
        var rotate = --num * 90;
    }
    var item = 0;
    var len = items.length;
    var timer = setInterval(function () {
        flag = false;
        $(items[item]).css({
            'transform': 'rotateX(' + rotate + 'deg)'
        });
        
        item++;
        // console.log(item);
        if (item >= len) {
            clearInterval(timer);
            $(items[len - 1]).on('transitionend', function () {
                flag = true;
            })
        }
    }, 1000);
}