var charBox=document.getElementById('char');
var result=document.getElementById('result');
var code;
var right=0;
var wrong=0;
//随机生成A-Z
function show(){
    code=Math.floor(Math.random()*26)+65;
    var char=String.fromCharCode(code);
    // console.log(code);
    charBox.innerHTML=char;
}
show();
//键盘按键事件
window.onkeydown=function(e){
    var key=e.keyCode;
    if(key==code){
        right++;
        show();
        charBox.className='animated zoomIn';
    }else{
        wrong++;
        charBox.className='animated shake error';
    }
    showResult();
    setTimeout(function(){
        charBox.className='';
    },500);
};
//显示结果
function showResult(){
    var rate=(100*(right)/(right+wrong)).toFixed(2);
    result.innerHTML='正确'+right+'个'+'错误'+wrong+'个'+'正确率'+rate+'%'
}