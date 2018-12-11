$(function(){
    var boxDom=$('#boxDom');
    var top,right;
    var pageWidth=parseInt($(document).width());
    var pageHeight=parseInt($(document).height());
    $('#btn').bind('click',auto);//按钮绑定方法
    document.onkeydown=function(){//回车键发送弹幕
        if(event.keyCode==13){
            auto();
        }
    }
    function auto(){
        //获取输入的字符串
        var str=$('.text').val();
        //生成一个元素
        var createSpan=$('<span class="string"></span>');
        //给元素赋值
        createSpan.text(str);
        //为了页面友好，清除刚输入的内容
        $('.text').val("");
        //生成元素一个随机的位置，为了使每一条弹幕都出现在不同的位置
        top=Math.floor(Math.random()*pageHeight);
        createSpan.css({
            'top':top,
            'right':-400,
            'color':getRandomColor()
        });
        boxDom.append(createSpan);
        //元素在DOM运动起来
        //首先有一个span，只让最后一个动起来
        var spandom=$('#boxDom>span:last-child');//找到最后一个span
        spandom.animate({'right':pageWidth+300},10000,function(){
            $(this).remove();
        });
    }
    //定义一个可以生成随机颜色的方法
    function getRandomColor(){
        var colorArr=['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
        var color="";
        for(var i=0;i<6;i++){
            color+=colorArr[Math.floor(Math.random()*16)];//忘记random加括号了
        }
        return '#'+color;
    }
})