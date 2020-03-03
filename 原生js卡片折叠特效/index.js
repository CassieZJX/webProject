var openBtn=document.getElementsByClassName('openBtn')[0];
var left=document.getElementsByClassName('left')[0];
var right=document.getElementsByClassName('right')[0];
var close=document.getElementsByClassName('close')[0];
var back=document.getElementsByClassName('back')[0];

openBtn.addEventListener('click',function(){
    back.style.zIndex=10;
    left.classList.add('open');
    setTimeout(function () {  
        right.classList.add('open');
    },250)
    setTimeout(function () {  
        back.classList.add('open');
    },250)
});
close.addEventListener('click',function(){
    left.classList.remove('open');
    setTimeout(function () {  
        right.classList.remove('open');
    },250);
    back.style.zIndex=4;
})