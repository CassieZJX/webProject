var drawObj = {
    cavs: $('.cavs'),
    ctx: $('.cavs').get(0).getContext('2d'),
    bool: false,
    colorBoard: $('#colorBoard'),
    lineRuler: $('#lineRuler'),
    arrimg: [],
    init: function () {
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.draw();
        this.bindEvent();
    },
    draw: function () {
        var cavs = this.cavs;
        var self = this;
        var c_x = cavs.offset().left,
            c_y = cavs.offset().top;
        cavs.mousedown(function (e) {
            self.bool = true;
            var m_x = e.pageX - c_x,
                m_y = e.pageY - c_y;
            self.ctx.beginPath();
            self.ctx.moveTo(m_x, m_y);
            cavs.mousemove(function (e) {
                if (self.bool) {
                    self.ctx.lineTo(e.pageX - c_x, e.pageY - c_y);
                    self.ctx.stroke();
                }
            });
            cavs.mouseup(function (e) {
                self.ctx.closePath();
                self.bool = false;
            });
            var imgData = self.ctx.getImageData(0, 0, self.cavs[0].width, self.cavs[0].height);
            self.arrimg.push(imgData);
        });
    },
    bindEvent: function () {
        var self = this;
        $('.btn-list').click(function (e) {
            switch (e.target.id) {
                case 'cleanBoard':
                    self.ctx.clearRect(0, 0, self.cavs[0].width, self.cavs[0].height);
                    break;
                case 'eraser':
                    self.ctx.strokeStyle = '#fff';
                    break;
                case 'rescind':
                    if (self.arrimg.length > 0) {
                        self.ctx.putImageData(self.arrimg.pop(), 0, 0);
                    }
                    break;

            }
        });
        this.colorBoard.change(function (e) {
            self.ctx.strokeStyle = $(this).val();
        });
        this.lineRuler.change(function (e) {
            self.ctx.lineWidth = $(this).val();
        });
    }
};
drawObj.init();