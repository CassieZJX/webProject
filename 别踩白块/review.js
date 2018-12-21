var main=$('.main'),
    num=0,
    speed=4,
    timer,
    flag=true,
    colors = ['#1aab8a', '#e15650', '#121B29', '#80a84e'];
start();
function start(){
    $('a').on('click',function(){
        if(main.children().length){
            main.html('');
        };
        $('a').css('display','none');
        $('.gameRule').css('display','none');
        move();
    });
    bindEvent();
}
function move(){
    timer=setInterval(function(){
        var top=parseInt(main.css('top'))+speed;
        main.css('top',top+'px');
        if(parseInt(main.css('top'))>=0){
            cDiv();
            main.css('top',-150+'px');
        }
        var len=main.children().length;
        if(len==6){
            for(j=0;j<4;j++){
                if(main.children()[len-1].children[j].className=='click'){
                    main.css('top','0px');
                    alert('游戏结束');
                    clearInterval(timer);
                    flag=false;
                }
            }
            $(main.children()[len-1]).remove();
        }

    },20);
    
}
function cDiv(){
    var oDiv=$('<div></div>');
    oDiv.attr('class','row');
    var index=parseInt(Math.random()*4);
    for(i=0;i<4;i++){
        var iDiv=$('<div></div>');
        oDiv.append(iDiv);
    }
    if(main.children().length==0){
        main.append(oDiv);
    }else{
        oDiv.insertBefore(main.children()[0]);
    }
    var clickDiv=oDiv.children()[index];
    $(clickDiv).css('background',colors[index]);
    $(clickDiv).attr('class','click');
};
function bindEvent(){
    main.on('click',function(e){
        if(flag){
            if(e.target.className=='click'){
                e.target.style.backgroundColor='#bbb';;
                e.target.className='';
                num++;
                // console.log(num);
            }else{
                main.css('top','0px');
                alert('游戏结束');
                clearInterval(timer);
                flag=false;
            };
        }
    })
}