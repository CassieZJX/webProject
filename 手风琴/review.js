var oUl = $('ul'),
    oLi = $('li'),
    len = oLi.length,
    width = parseInt(oUl.css('width')),
    ot = Math.floor(width - 400) / (len - 1),
    flag = true;
init();
bindEvent();
function init() {
    if (flag) {
        change($(oLi[len - 1]));
    }
}
function bindEvent() {
    oLi.on('click', function () {
        change($(this));
        if ($(this).index() + 1 == len) {
            flag = false;
        }
        else {
            flag = true;
        }
    })
    oLi.on('mouseleave', function () {
        init();
    })
}

function change(dom) {
    dom.animate({
        'width': '400px'
    }, 300, 'linear')
        .siblings().animate({
            'width': ot + 'px'
        }, 300, 'linear');
    dom.find('.title').css({
        'display': 'none'
    })
    dom.siblings().find('.title').css({
        'display': 'block'
    });
    dom.find('.der').css({
        'bottom': '0px'
    });
    dom.siblings().find('.der').css({
        'bottom': '-50px'
    })
}