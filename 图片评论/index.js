var ul=$('.photos');
var photoView=$('.photoView');
var activeClass='tm-current';
init();
function init(){
    start();
    mouseHover();
    bindEvent();
}
function start(){
    ul.find('li').on('click',function(){
        var self =$(this);
        self.toggleClass(activeClass).siblings().removeClass(activeClass);
        var src=self.find('img').attr('src');
        // console.log(src);
        var img=new Image();
        img.src=src;
        var imgW=img.width;
        var imgH=img.height;
        // console.log(imgH);
        var flag=self.hasClass(activeClass);
        if(flag){
            img.onload=function(){
                photoView.css({
                    width:imgW+'px',
                    height: imgH+'px',
                    transition: 'all 100ms ease-out'
                });
                photoView.find('a').css({
                    height: imgH+'px'
                });
                photoView.find('span').css({
                    height: (imgH/2+10)+'px'
                });

                photoView.find('img').on('click', function () {
                    self.removeClass(activeClass);
                    photoView.css({
                        width: 0,
                        height: 0,
                        transition: 'all 100ms ease-out'
                    })
                })
            }
            photoView.find('img').attr('src',src);
        }
        else{
            photoView.css({
                width:0,
                height: 0,
                transition: 'all 100ms ease-out'
            });
        }
    })
}
function mouseHover(){
    photoView.find('a').hover(function(){
        var self=$(this);
        var index=ul.find('li').index($('li.'+activeClass));
        var len=ul.find('li').length-1;
        var cla=self.attr('class');
        console.log(index);
        if((cla=='navL'&&index==0)||(cla='navR'&&index==len)){
            self.children().css({
                'display':'none'
            });
        }else{
            self.children().css({
                'display':'inline-block'
            });
        }
    },function(){
        var self=$(this);
        self.children().css({
            'display':'none'
        });
    })
}
function bindEvent(){
    
}