var wrap = $('.wrapper');
var picLi = $('.photos li');
var listLi = $('.list li');
var len = picLi.length;
var width = parseInt(wrap.width());
var height = parseInt(wrap.height());
var nowIndex = 0;
var rotate = true;

init();
function init() {
    change(0);
    bindEvent();
}
function bindEvent() {
    picLi.on('click', function () {
        var $this = $(this);
        changeIndex($this.index());
    });
    listLi.on('click', function () {
        var $this = $(this);
        changeIndex($this.index());
    })
}

function changeIndex(index) {
    if (index != nowIndex) {
        nowIndex = index;
        change(index);
        // console.log('index'+index,'nowindex'+nowIndex);
    } else {
        if (rotate) {
            getRotate(1, index);
            // console.log(111);
            rotate = false;
        }
        else {
            getRotate(-1, index);
            // console.log(222);
            rotate = true;
        }
    }
}
//所有图片旋转平移
function change(index) {
    for (var i = 0; i < len; i++) {
        i % 2 == 0 ? d = 1 : d = -1;
        var deg = parseInt(Math.random() * 360);
        var z = parseInt(Math.random() * 100);
        var h = parseInt(Math.random() * (height - 200));
        var w = parseInt(Math.random() * (width - 200));
        var p = parseInt(Math.random() * 10) % 2 == 0 ? p = 1 : p = -1;
        $(picLi[i]).css({
            'transform': 'rotateZ(' + d * (360 - deg) + 'deg) translateZ(-' + z + 'px)',
            'transition': 'all 0.2s ease-out',
            'transform-origin': '50% 50% 0'
        });
        $(picLi[i]).on('transitionend', (function (i) {
            $(picLi[i]).animate({
                'top': p * (h / 2) + 'px',
                'left': p * (w / 2) + 'px',
                'z-index': 0
            }, 1500, 'swing')
        })(i));
        $(listLi[i]).css({
            'transform': 'rotateY(0deg) scale(1)',
            'backgroundColor':'#00807a',
        })
    };
    $(picLi[index]).animate({
        'top': '0px',
        'left': '0px'
    }, 10, function () {
        $(picLi[index]).css({
            'z-index': 10000,
            'transform': 'rotateZ(0deg) translateZ(10px)',
            'transform-origin': '50% 50% 0'
        })
    });
    $(listLi[index]).css({
        'transform': 'rotateY(360deg) scale(2)',
    })
}
//自身旋转
function getRotate(r,index) {
    var color;
    r==1?color='red':color='#00807a';
    $(picLi[index]).css({
        'z-index':11000,
        'transform': 'rotateY('+r*360+'deg) translateZ(0px)',
        'transition': 'all 1s ease-in-out',
    });
    // $(picLi[index]).css({
    //     'transform': 'rotateY(0deg) translateZ(0px)',
    //     'transition': 'all 0s',
    // });
    $(listLi[index]).css({
        'backgroundColor':color,
        'transform': 'rotateY('+r*180+'deg) scale(2)',
        'transition': 'all 0.4s ease-in-out',
        'transform-origin': '50% 50% 0'
    });
    $(listLi[index]).css({
        'transform': 'rotateY(0deg) scale(2)',
        'transition': 'all 0s',
        'transform-origin': '50% 50% 0'
    })
}