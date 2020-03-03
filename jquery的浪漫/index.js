//旋转
$('.pic ul li').each(function(i){
    var size=$('.pic ul li').length;
    var deg=360/size;//size() is not a funtion
    $(this).css({'transform':'rotateY('+deg*i+'deg) translateZ(200px)'});
});


//字的显示typing
var i=0;
var str="你牵着我的手，我们走在最爱的石子路上，看那些开的不是很鲜艳的花，你我依然一路欣赏，踩着落叶在寂静的公园里显得格外大声，我们一步一步慢慢地向前走着，只要你还牵着我的手，我便跟着你一起走。";
window.onload=function typing(){
    var mydiv=document.getElementById('text');
    mydiv.innerHTML+=str.charAt(i);
    i++;
    var id=this.setTimeout(typing,100);
    if(i==str.length){
        clearTimeout(id);
    };
};


//雪花的飘落
var minSize=5;//最小雪花
var maxSize=50;//最大雪花
var newOne=100;//生成雪花时间
var flakColor='#fff';//雪花的颜色
var flak=$('<div class="xh"></div>').css({
    'position':'absolute',
    'top':0
}).html('❄');//定义一个雪花
var dhight=$(window).height();//定义视图高度
var dwidth=$(window).width();//定义视图宽度
setInterval(function(){//定时器生成雪花
    var sizeflak=minSize+Math.random()*maxSize;//雪花随机大小
    var starleft=Math.random()*dwidth;//随机left值
    var staropcity=0.7+Math.random()*0.3;//雪花随机透明度
    var endpositionTop=dhight-100;//雪花停止的top
    var endleft=Math.random()*dwidth;//雪花停止的随机left值
    var durationfull=5000+Math.random()*3000;//雪花的速度
    flak.clone().appendTo($('body')).css({//克隆多个雪花
        'left':starleft,
        'opacity':staropcity,
        'font-size':sizeflak,
        'color':flakColor
    }).animate({//雪花逐渐停止
        'top':endpositionTop,
        'left':endleft,
        'opacity':0.1
    },durationfull,function(){//雪花融化
        $(this).remove();
    });
},newOne);