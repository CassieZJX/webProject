var per=0;
//进度条的加载
var timer=setInterval(function(){
    $('.bar').css('width',per+'%');
    per+=1;
    if(per>100){
        $('.pageLoading').addClass('complete');
        $('.complete').on('transitionend',function(){
            this.style.opacity=0;
        }) 
    }
},30)