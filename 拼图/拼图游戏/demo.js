var imgArea = $('.imgArea');
var btnStart = $('.start');
var imgW = parseInt(imgArea.css('width'));
var imgH = parseInt(imgArea.css('height'));
var cellW = imgW / 3;
var cellH = imgH / 3;
var imgCell, imgOrignArr, imgRanArr;
init();
function init() {
    imgSplit();
    bindEvent();
}
//分散图片
function imgSplit() {
    imgOrignArr = [];
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            imgOrignArr.push(i * 3 + j);
            var cell = $('<div class="imgCell"></div>');
            cell.css({
                width: cellW + 'px',
                height: cellH + 'px',
                background: 'url(pic.jpg)',
                left: j * cellW + 'px',
                top: i * cellH + 'px',
                backgroundPosition: (-j) * cellW + 'px ' + (-i) * cellH + 'px'
            });
            imgArea.append(cell);
        }
    }
    imgCell = $('.imgCell');
    // console.log(imgOrigArr);
}
function bindEvent() {
    btnStart.on('click', function () {
        randArr();
        cellOrder(imgRandArr);
        imgCell.css({
            cursor: 'pointer'
        }).on('mouseover',function(){
            $(this).addClass('hover');
        }).on('mouseout',function(){
            $(this).removeClass('hover');
        }).on('mousedown',function(e){
            $(this).css('cursor','move');
            var cellIndex=$(this).index();
            var cellX=e.pageX-imgCell.eq(cellIndex).offset().left;
            var cellY=e.pageY-imgCell.eq(cellIndex).offset().top;
            // console.log(cellX,cellY);
            $(document).on('mousemove',function(e1){
                imgCell.eq(cellIndex).css({
                    'left': (e1.pageX-cellX-imgArea.offset().left)+'px',
                    'top': (e1.pageY-cellY-imgArea.offset().top)+'px',
                    'z-index':40
                })
            }).on('mouseup',function(){
                var cellIndex2=changeIndex();
                if(cellIndex==cellIndex2){
                    cellReturn();
                }else{
                    cellChange(cellIndex,cellIndex2);
                }
                $(document).off('mousemove');
            })
        })
    })
}
//打乱数组
function randArr() {
    imgRandArr = [];
    var len = imgOrignArr.length;
    var order;
    for (i = 0; i < len; i++) {
        order = Math.floor(Math.random() * len);
        if (imgRandArr.length > 0) {
            while (jQuery.inArray(order, imgRandArr) > -1) {
                order = Math.floor(Math.random() * len);
            }
        }
        imgRandArr.push(order);
    }
    console.log(imgRandArr);
    return;
}
//根据打乱的数组重新渲染
function cellOrder(arr) {
    for (i = 0; i < arr.length; i++) {
        imgCell.eq(i).animate({
            'left': arr[i] % 3 * cellW + 'px',
            'top': Math.floor(arr[i] / 3) * cellH + 'px'
        },400)
    }
}