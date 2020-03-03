var ulCon = $('.photos');
var boxCon = $('.photoView');
var activeClass = 'tm-current';
var len;
init();
function init() {
    start();
    mouseHover();
    bindEvent();
}
//点击li显示大图片和边框下三角
function start() {
    ulCon.find('li').on('click', function () {
        var $this = $(this);
        $this.toggleClass(activeClass).siblings().removeClass(activeClass);
        var src = $this.find('img').attr('src'),
            flag = $this.hasClass(activeClass),
            img = new Image();
        img.src = src;
        //如果点击li
        if (flag) {
            //当前图片加载完后
            img.onload = function () {
                var imgW = img.width;
                var imgH = img.height;
                boxCon.css({
                    'width': imgW + 'px',
                    'height': imgH + 'px',
                    'transition': 'all 100ms ease-out'
                });
                //左右箭头居中
                boxCon.find('a').css({
                    'height': imgH + 'px'
                });
                boxCon.find('span').css({
                    'height': (imgH / 2 + 10) + 'px'
                });
                boxCon.find('img').on('click', function () {
                    $this.removeClass(activeClass);
                    boxCon.css({
                        'width': 0,
                        'height': 0,
                        'transition': 'all 100ms ease-out'
                    })
                })
            }
            boxCon.find('img').attr('src', src);
        }
        else {
            boxCon.css({
                'width': 0,
                'height': 0,
                'transition': 'all 100ms ease-out'
            })
        }
    })
}
//出现左右两个箭头
function mouseHover() {
    boxCon.find('a').hover(function () {
        var $this = $(this);
        var cla = $this.attr('class');
        var index = ulCon.find('li').index($('li.' + activeClass));//找到当前点击的li的索引值
        var len = ulCon.find('li').length - 1;//看有多少个li
        //第一张不会显示左箭头和最后一张不会显示右箭头
        if ((cla == 'navL' && index == 0) || (cla == 'navR' && index == len)) {
            $this.children().css({
                'display': 'none'
            });
        }
        else {
            $this.children().css({
                'display': 'inline-block'
            })
        }
    }, function () {
        var $this = $(this);
        $this.children().css({
            'display': 'none'
        })
    })
}
//点击上下两张
function bindEvent() {
    var clickTar = {};
    //点击左右箭头实现上一张下一张
    boxCon.find('span').on('click', function () {
        var $this = $(this);
        clickTar.class = $($this.parent()).attr('class');//获取a的类名
        clickTar.index = ulCon.find('li').index($('li.' + activeClass));
        var index = clickTar.index;
        var len = ulCon.find('li').length - 1;
        clickTar.class == 'navL' ? index-- : index++;
        if (index >= 0 && index <= len) {
            var src = ulCon.find('li').eq(index).find('img').attr('src');//获取照片的src
            ulCon.find('li').eq(index).toggleClass(activeClass).siblings().removeClass(activeClass);
            boxCon.find('img').attr('src', src);
            var img = new Image;
            img.src=src;
            var imgW = img.width;
            var imgH = img.height;
            boxCon.css({
                'width': imgW + 'px',
                'height': imgH + 'px',
                'transition': 'all 100ms ease-out'
            })
            boxCon.find('a').css({
                'height': imgH + 'px'
            });
            boxCon.find('span').css({
                'height': (imgH / 2 + 10) + 'px'
            });
        }
        if(index<0||index>len){
            $this.css('display','none')
        }
    })

}