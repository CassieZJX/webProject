//粗心犯的问题1.24行function忘记传入e
//           2.39行y的坐标复制后忘改
var wrap = $('.wrapper');
var con = $('.content');
var imgCov = $('.imgCov');
var moveBox = $('.moveView');
var bigView = $('.bigView');
var oUl = $('ul');
var mul = 4;//放大倍数
var moveBoxW,imgW,imgH;

function init(){
    bindEvent();
    createMove();
}
init();
function bindEvent(){
    getIndex(0);
    oUl.find('li').on('click',function(){
        index = $(this).index();
        // console.log(index);
        getIndex(index);
    });
    con.on('mousemove',function(e){
        move(e);
    }).on('mouseleave',function(){
        bigView.hide();
        moveBox.hide();
    })
}
function move(e){
    //  console.log(con.width())
     var minXl = (500 - imgW)/2;
     var maxXr = 500 - minXl - moveBoxW;
     var minYt = (500 - imgH)/2;
     var maxYb = 500 - minYt - moveBoxW;
     var X = e.clientX - wrap.offset().left - moveBoxW/2;
     var Y = e.clientY - wrap.offset().top - moveBoxW/2;
     var endX =(X > minXl)?(X < maxXr)?X : maxXr : minXl;
     var endY =(Y > minYt)?(Y < maxYb)?Y : maxYb : minYt;
     moveBox.css({
         'left': endX,
         'top':endY,
         'display':'block'
     });
     var posX = (endX - (500 - imgW)/2)*mul;
     var posY = (endY - (500 - imgH)/2)*mul;
     bigView.css({
         'display':'block'
     }).find('img').css({
         'margin-left':-posX,
         'margin-top':-posY         
     })
}

function createMove(){
    moveBoxW = 500/mul;
    moveBox.css({
        'width':moveBoxW + 'px',
        'height':moveBoxW + 'px',
    })
}
function getIndex(index){
    var styleCss;
    var img = new Image();
    var src = oUl.find('img').eq(index).attr('src');
    img.src = src;    
    oUl.find('li').removeClass('active').eq(index).addClass('active');    
    imgW = img.width;
    imgH = img.height;
    if(imgW >= imgH){
        imgW =  500;
        imgH = imgH / imgW *500;
        //宽度>高度--上下居中
        styleCss = 'top:50%;margin-top:'+ (-imgH/2) + 'px';
    }else{
        imgH = 500;
        imgW = imgW / imgH *500;
        //宽度<高度--左右居中
        styleCss = 'left:50%;margin-left:'+ (-imgW/2) + 'px';        
    }
    imgCov.empty().append('<img src="'+ src+'"width="'+imgW+'"height="'+imgH+'"style="'+styleCss+ '"/>');
    bigView.empty().append('<img src="'+ src+'"width="'+imgW*mul+'"height="'+imgH*mul+ '"/>');  
}

