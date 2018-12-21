//最大的错误，习惯写class,取id时也自然写为(.)了       id(#)和class(.)没对应
//注意将全局this储存
var drawingLineObj = {
    cavs: $('.cavs'),
    context: $('.cavs').get(0).getContext('2d'),
    colorBoard: $('#colorBoard'),
    // cleanBoard: $('#cleanBoard'),
    // eraser: $('#eraser'),
    // rescind: $('#rescind'),
    lineRuler: $('#lineRuler'),
    arrImg: [],//用于储存每一笔
    bool: false,//锁
    init: function () {
        this.context.lineCap = 'round';//线条起始和结束是样式
        this.context.lineJoin = 'round';//转弯
        this.draw();
        this.btnFun();//点击按钮事件
    },
    draw: function () {
        var cavs = this.cavs,
            self = this;
        var c_x = cavs.offset().left,
            c_y = cavs.offset().top;
        //画笔放下
        cavs.mousedown(function (e) {
            e = e || window.event;
            self.bool = true;
            var m_x = e.pageX - c_x,
                m_y = e.pageY - c_y;
            self.context.beginPath();
            self.context.moveTo(m_x, m_y);
            //画笔移动
            cavs.mousemove(function (e) {
                if (self.bool) {
                    self.context.lineTo(e.pageX - c_x, e.pageY - c_y);
                    self.context.stroke();
                }
            });
            //画笔抬起
            cavs.mouseup(function (e) {
                self.context.closePath();
                self.bool = false;
            });
            //画笔离开
            cavs.mouseleave(function (e) {
                self.context.closePath();
                self.bool = false;
            });
            //储存每一笔，撤消时将最后一笔移除数组
            var imgData = self.context.getImageData(0, 0, self.cavs[0].width, self.cavs[0].height);
            self.arrImg.push(imgData);
            // console.log(self.arrImg);
        })
    },
    //按钮点击事件
    btnFun: function () {
        var self = this;
        $('.btn-list').on('click', function (e) {
            e = e || window.event;
            // console.log(e.target.id);
            switch (e.target.id) {//获取操作的id
                case 'cleanBoard'://清屏
                    self.context.clearRect(0, 0, self.cavs[0].width, self.cavs[0].height);
                    break;
                case 'eraser'://橡皮擦
                    self.context.strokeStyle = '#fff';
                    break;
                case 'rescind'://撤消
                    if (self.arrImg.length > 0) {//小于0会报错
                        self.context.putImageData(self.arrImg.pop(), 0, 0);
                        // console.log(self.arrImg);
                    }
                    break;
            }
        });
        this.colorBoard.change(function (e) {//改变画笔颜色
            self.context.strokeStyle = $(this).val();
        });
        this.lineRuler.change(function (e) {//改变笔触
            self.context.lineWidth = $(this).val();
        });
    }
}
drawingLineObj.init();