function Index(mus){
    this.music=mus.music;
    this.dom={
        sun:$('.sun'),
        moon:$('.moon'),
        audio:$('audio'),
        per:$('.per')
    };
    this.top=this.dom.moon.offset().top-$('.wrapper').offset().top;
    this.flag=false;
    this.init();
}
Index.prototype.init=function(){
    var source=$('<source src='+this.music+'></source>');
    this.dom.audio.append(source);
    this.bindEvent();
    this.change(0);
};
Index.prototype.bindEvent=function(){
    var self=this;
    var moon=this.dom.moon;
    moon.on('mousedown',function(e){
        self.flag=true;
        var dis=e.clientX-moon.offset().left;
        moon.on('mousemove',function(e){
            if(self.flag){
                var left=e.clientX-dis-$('.wrapper').offset().left;
                moon.css({
                    'left':left+'px',
                    'top':self.top+'px'
                });
                self.getVoice();
            };
        });
        moon.on('mouseup',function(e){
            self.flag=false;
        })
    });
    
};
//根据两球的距离动态改变音量per
Index.prototype.getVoice=function(){
    var self=this;
    var d= parseInt(self.dom.moon.css('width'));
    var sunL=self.dom.sun.offset().left,
        sunR=sunL+d,
        moonL=self.dom.moon.offset().left,
        moonR=moonL+d,
        per;
    if(sunR<moonL||sunL>moonR){
        per=0;
    }else{
        if(sunR<moonR){
            per=(sunR-moonL)/d
        }else if(sunL<=moonR){
            per=(moonR-sunL)/d
        }
    }
    // console.log(per);
    self.change(per);
};
//根据Per调节音量大小
Index.prototype.change=function(per){
    var self=this;
    self.dom.audio[0].volume=per;
    self.dom.per.html((per*100).toPrecision(4)+'%');
    self.dom.moon.css({
        'background': 'hsl(194,56%,'+(1-per)*50 +'%)'
    });
    $('body').css({//背景颜色的变化
        'background': 'hsl(' + (194 + Math.floor(166*per)) + ",66%,"+(1-per)*50+'%)'       
    })
}
new Index({'music':'music/summer.mp3'});