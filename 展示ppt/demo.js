var obj = {
    $slider: $('.slider'),
    $slider_list:$('.slider-list'),
    nowIndex: 0,
    timer: undefined,
    //初始函数
    init: function () {
        //点击事件
        this.bindEvent();
        //自动轮播
        this.sliderAuto();
    },
    bindEvent: function () {
        var self = this;
        //left-btn right-btn order-li
        $('li').add($('.left-btn')).add($('.right-btn')).on('click', function () {
            if ($(this).attr('class') == 'left-btn') {//点击左边按钮，ppt往前一张
                self.tool('left');
            } else if ($(this).attr('class') == 'right-btn') {//点击右边按钮，ppt往后一张
                self.tool('right');
            } else {
                self.tool($(this).index());//点击下方小圆点到index相对应的ppt
            }
        });
        $('.left-btn').add($('.right-btn')).hover(function () {//hover左右按钮的样式
            $(this).css({
                'transform': 'rotate(360deg)'
            })
        }, function () {
            $(this).css({
                'transform': 'rotate(0deg)'
            })
        });
        //nowIndex 自定义事件
        this.$slider.on('come', function () {
            // var self=this;
            console.log(this);
            $(this).fadeIn(300).find('img').delay(300).animate({//人物淡入
                'width': '40%'
            }, 300, 'linear', function () {
                self.sliderAuto();//这里有问题
                // console.log(111);
            })
        });
        //lastIndex 自定义事件
        this.$slider.on('leave', function () {
            console.log(this);
            $(this).fadeOut(300).find('img').animate({//人物淡出
                'width': '0%'
            },300,'linear');
        });
    },
    //获取index值
    getIndex: function (dir) {
        this.lastIndex = this.nowIndex;
        //left：nowIndex--    right:nowIndex++    li:nowIndex=dir
        if (dir == 'left') {
            //若第一张点击上一张到最后一张
            this.nowIndex = this.nowIndex === 0 ? 3 : this.nowIndex - 1;
        } else if (dir == 'right') {
            //若最后一张点击下一张到第一张
            this.nowIndex = this.nowIndex === 3 ? 0 : this.nowIndex + 1;
        } else {
            this.nowIndex = dir;
        }
        // console.log('当前索引值'+this.nowIndex);
    },
    //小圆点的样式变化
    changeActive: function () {
        $('.active').removeClass('active');
        $('li').eq(this.nowIndex).addClass('active');
    },

    sliderAuto: function () {
        var self = this;
        clearTimeout(self.timer);
        timer = setTimeout(function () {
            self.tool('right');
        },3000);
    },
    //自动轮播
    tool: function (val) {
        this.getIndex(val);
        this.changeActive();
        this.$slider.eq(this.nowIndex).trigger('come');
        this.$slider.eq(this.lastIndex).trigger('leave');
    }
};
obj.init();