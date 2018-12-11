var oUl = $('ul'),
    oLi = $('li'),
    len = oLi.length,
    width = parseInt(oUl.css('width')),
    ot = Math.floor((width - 400) / (len - 1)),
    flag = true;
    init();
function init() {
    // $('.picBox1')
    //初始状态（flag为true），默认最后一张图片展开
    if (flag) {
        change($(oLi[len - 1]));
    }

}
bindEvent();
function bindEvent() {
    oLi.on('click', function () {
        change($(this));
        if ($(this).index() + 1 == len) {
            //当前点击的是最后一张
            flag = false;
        }
        else {
            flag = true;
        }
    })
    oUl.on('mouseleave', function () {
        init();
    })
}
function change(event) {
    //宽度变长
    event.animate({
        'width': '400px',
    }, 300, 'linear').siblings().animate({
        'width': ot + 'px'
    }, 300, 'linear');
    //点击当前大标题，大标题消失，其他大标题不变
    event.find('.title').css({
        'display': 'none'
    });
    event.siblings().find('.title').css({
        'display': 'block'
    });
    //出现下方文字
    event.find('.der').css({
        'bottom': '0px'
    })
    event.siblings().find('.der').css({
        'bottom': '-50px'
    })
}