(function ($) {
    function init(dom, args) {
        if (args.current <= args.pageCount) {
            fillHtml(dom, args);
            bindEvent(dom, args);
        } else {
            alert("请输入正确页数");
        }
    }
    function fillHtml(dom, args) {
        dom.empty();
        //上一页
        if (args.current > 1) {
            dom.append('<a herf="#" class="prvePage">上一页</a>')
        }
        else {
            dom.remove('prvePage');
            dom.append('<span class="disabled">上一页</span>');
        }
        //数字
        //第一页
        if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
            dom.append('<a herf="#" class="tcdNumber">' + 1 + '</a>')
        }
        //左边的省略号
        if (args.current - 2 > 2 && args.pageCount > 5 && args.current <= args.pageCount) {
            dom.append('<span>...</span>');
        }
        //中间的数字
        var start = args.current - 2;
        var end = args.current + 2;
        for (; start <= end; start++) {
            if (start >= 1 && start <= args.pageCount) {
                if (start != args.current) {
                    dom.append('<a herf="#" class="tcdNumber">' + start + '</a>')
                }
                else {
                    dom.append('<span class="current">' + start + '</span>');
                }
            }
        }
        //右边的省略号
        if (args.current + 2 < args.pageCount - 1 && args.pageCount > 5) {
            dom.append('<span>...</span>');
        }
        //末尾的数字
        if (args.current != args.pageCount && args.pageCount != 4 && args.current < args.pageCount - 2) {
            dom.append('<a herf="#" class="tcdNumber">' + args.pageCount + '</a>')
        }

        //下一页
        if (args.current < args.pageCount) {
            dom.append('<a herf="#" class="nextPage">下一页</a>')
        }
        else {
            dom.remove('nextPage');
            dom.append('<span class="disabled">下一页</span>');
        }
    }
    function bindEvent(dom, args) {
        // fillHtml(dom, args);
        //页数的点击
        dom.on('click', '.tcdNumber', function () {
            var current = parseInt($(this).text());
            fillHtml(dom, { 'current': current, 'pageCount': args.pageCount });
            if (typeof (args.backFun == "function")) {
                args.backFun(current);
            }
        })
        //点击上一页
        dom.on('click', '.prvePage', function () {
            var current = parseInt(dom.children('.current').text());
            fillHtml(dom, { 'current': current - 1, 'pageCount': args.pageCount });
            if (typeof (args.backFun == 'function')) {
                args.backFun(current - 1);
            }
        })
        //点击下一页
        dom.on('click', '.nextPage', function () {
            var current = parseInt(dom.children('.current').text());
            fillHtml(dom, { 'current': current + 1, 'pageCount': args.pageCount });
            if (typeof (args.backFun == 'function')) {
                args.backFun(current + 1);
            }
        })
    }
    $.fn.createPage = function (options) {
        var args = $.extend({
            pageCount: 10,
            current: 1,
            backFun: function () { }
        }, options);
        init(this, args);
    }
})(jQuery)