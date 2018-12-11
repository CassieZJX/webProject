//出现问题：再次点击从小图到大图，大图是白色的，位置不对
//原因：再次点击进去后bgLeft,bgTop是上次的值，需要重新赋值为0
function Index(row, col) {
    this.num = {
        totalW: $('#wrap-ul').width(),
        totalH: $('#wrap-ul').height(),
        rows: row,
        collums: col
    }
    this.createDom();
}
//动态操作DOM，添加图片
Index.prototype.createDom = function () {
    //获取初始值
    var r = this.num.rows,
        c = this.num.collums,
        w = this.num.totalW / c,//获得每个li的宽高
        h = this.num.totalH / r;
    this.num.width = w;//存到全局
    this.num.height = h;
    //生成五行五列
    for (var i = 0; i < r; i++) {
        for (var j = 0; j < c; j++) {
            $('<li><div class="box"><img src=""></div></li>').width(w).height(h)
                .css({
                    //初始时每个li重叠，改变每个li的位置
                    'left': w * j + 'px',
                    'top': h * i + 'px',
                    //用Math.random改变在坐标轴上的偏移
                    'transform': 'rotate(' + (Math.random() * 40 - 20) + 'deg)' +
                        'translateX(' + (30 * j - 60) + 'px)' +
                        'translateY(' + (30 * i - 60) + 'px)' +
                        'translateZ(-' + Math.random() * 500 + 'px)'
                }).find('img').attr('src', 'img/' + (i * c + j) + '.jpg')//找到图片加上src属性 
                .end()//对end方法不是很了解
                .appendTo($('#wrap-ul'));//插入到父级中
        }
    }
    this.bindEvent();//点击事件
}
//实现从大图变小图，小图变大图
Index.prototype.bindEvent = function () {
    var self = this;
    var h = this.num.totalH,
        w = this.num.totalW,
        width = this.num.width,
        height = this.num.height,
        change = true;
    $('#wrap-ul').find('li').on('click', function () {//给每个li绑定点击事件
        if (change) {//未点击状态，小图变大图
            var  bgLeft = 0,
                 bgTop = 0;
            var bgImg = $(this).find('img');//获取当前点击图片
            $('#wrap-ul li').each(function (index) {
                var $this = $(this);
                $this.delay(10 * index).animate({
                    'opacity': 1
                }, 200, function () {
                    $this.css({
                        'transform': 'translate3d(0,0,0)'
                    })
                    $this.find('.box').css({
                        'transform': 'scale(1)'
                    })
                    //将所有图片变为当前点击的图片
                    $this.find('img').attr('src', bgImg.attr('src')).css({
                        'position': 'absolute',
                        'height': h + 'px',
                        'width': w + 'px',
                        'left': -bgLeft + 'px',
                        'top': -bgTop + 'px',
                    });
                    $('ul').css({
                        'overflow': 'hidden',
                    });
                    bgLeft += width;
                    //每个li取相应位置，拼成一张大图
                    if (bgLeft >= w) {
                        bgLeft = 0;
                        bgTop += height;
                    }
                    $this.animate({ 'opacity': 1 })
                })
            })
            change = false;
        } else {//大图状态
            $('#wrap-ul li').each(function (index) {
                var $this = $(this);
                //i，j
                var c = index % self.num.collums;//不懂
                var r = parseInt(index / self.num.collums);//不懂
                $this.animate({
                    'opacity': 0
                }, 200, function () {
                    $this.find('img').css({
                        'width': 100 + '%',
                        'height': 100 + '%',
                        'top': 0,
                        'left': 0,
                        'position': 'absolute'
                    });
                    //将相同的图片重新变回原来不一样的图片
                    $this.find('img').attr('src', 'img/' + index + '.jpg');
                    //大图变小图
                    $this.css({
                        'transform': 'rotate(' + (Math.random() * 40 - 20) + 'deg)' +
                            'translateX(' + (30 * c - 60) + 'px)' +
                            'translateY(' + (30 * r - 60) + 'px)' +
                            'translateZ(-' + Math.random() * 500 + 'px)',
                        'height': 30 + 'px',
                        'width': 40 + 'px',
                    })
                    $this.find('.box').css({
                        'transform': 'scale(0.9)'
                    })
                    $('ul').css({
                        'overflow': 'visible',
                    })
                    $this.animate({
                        'opacity': 1,
                        'width': self.num.width + 'px',
                        'height': self.num.height + 'px',
                    }, 1200)
                })
            })
            change = true;
        }
    })
}
new Index(5, 5);
