//原生js实现
window.onload = function () {
    var items = document.getElementsByClassName('slider-item');
    var prev = document.getElementsByClassName('prev')[0];
    var next = document.getElementsByClassName('next')[0];
    var len = items.length;
    var flag = true;
    var num = 0;
    init();
    function init() {
        for (var i = 0; i < len; i++) {
            var width = items[i].offsetWidth;
            items[i].style.left = i * width + 'px';
            var children = items[i].children;
            for (var j = 0; j < children.length; j++) {
                children[j].style.backgroundPositionX = -i * width + 'px'
            }
        }
        bindEvent();
    }
    function bindEvent() {
        prev.onclick = function () {
            if (flag) {
                change(-1);
                flag=true;
            }
        }
        next.onclick = function () {
            if (flag) {
                change(1);
                flag=true;
            }
        }
    }
    function change(type) {
        if (type == -1) {
            var rotate = ++num * 90;
        } else if (type == 1) {
            var rotate = --num * 90;
        }
        for(var i=0;i<len;i++){
            items[i].style.transform='rotateX('+rotate+'deg)';
            flag=false;
        }
    }
}