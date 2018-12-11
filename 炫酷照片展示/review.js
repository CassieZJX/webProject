//三个变化  1.图片变小--scale(0)
//         2.图片变大--scale(1) 透明度0
//         3.转一圈
function Index() {
    this.dom = {
        img: $('img'),
        btn: $('.btn')
    }
    this.flag = true;
    this.bindEvent();
}
Index.prototype.bindEvent = function () {
    var self = this;
    var img = self.dom.img;
    var len = img.length;
    self.dom.btn.on('click', function () {
        //🔒防止连续点击按钮，执行动画，必须等一个完整的动画结束后才能继续点击按钮
        if (!self.flag) {
            return;
        }
        var endNum = 0;
        self.flag = false;
        //闭包 立即执行函数
        setTimeout(function () {
            self.monition(img, '1s', function () {//图片变小 
                $(this).css({
                    'transform': 'scale(0)'
                })
            }, function () {
                self.monition(this, '1s', function () {//图片变大
                    $(this).css({
                        'transform': 'scale(1)',
                        'opacity': 0
                    })
                }, function () {
                    endNum++;
                    if (endNum == len) {
                        self.show();
                    }
                })
            });
        }, Math.random() * 1000);
    })
}
Index.prototype.show = function () {
    var self = this;
    var img = self.dom.img;
    var len = img.length;
    var allEnd = 0;
        $(img).css({//在z轴上后移
            'transition': '',
            'transform': 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)'
        });
            setTimeout(function () {
                self.monition(img, '2s', function () {
                    $(this).css({//在Y轴上旋转360度
                        'transform': 'rotateY(-360deg) translateZ(0)',
                        'opacity': 1
                    })
                }, function () {//确保全部图片的动画完整后才能继续点击，当前动画 100% 完成之后执行
                    allEnd++;
                    if (allEnd == len) {
                        self.flag = true;
                    }
                })
            }, Math.random() * 1000);
}
Index.prototype.monition = function (dom, time, doFun, callBack) {
    var self = this;
    $(dom).css({
        'transition': time  //动画改变时间
    });
    doFun.call(dom); //改变this指向
    var called = true;
    $(dom).on('transitionend', function () {  //过渡完
        if (called) {
            callBack && callBack.call(dom);
            called = false;
        }
    })
}
new Index();