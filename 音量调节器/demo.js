//js插入音乐路径
function Index(mus){
    this.music = mus.music;
    this.dom = {
        sun: $('.sun'),
        moon: $('.moon'),
        audio: $('audio'),
        perc: $('.per')      
    }
    this.flag = false;//监控是否在拖拽
    this.top = this.dom.moon.offset().top - $('.wrapper').offset().top;
    this.init(); 
}
//初始函数
Index.prototype.init = function(){
    var source = $('<source src="'+this.music+'"></source>');
    this.dom.audio.append(source);//加载音乐
    this.bindEvent();
    this.change(0);
}
//鼠标绑定事件
Index.prototype.bindEvent = function(){
    //拖拽 mousedown-->mousemove-->mouseup
    var self = this;
    var moon = self.dom.moon;
    var disX;
    moon.on('mousedown',function(e){//鼠标落下
        self.flag = true;
        disX = e.clientX - moon.offset().left;//鼠标距元素左边距离
    });
    moon.on('mousemove',function(e){//鼠标移动
        if(!self.flag){
            return;
        }
        var left = e.clientX - disX - $('.wrapper').offset().left;//获得当前鼠标距离wrapper的left
        moon.css({
            'left': left + 'px',
            'top': self.top + 'px'
        })
        self.getVoice();
    })
    moon.on('mouseup',function(e){//鼠标抬起
        self.flag = false;
    })
}
Index.prototype.getVoice = function(){ 
    var self = this;
    var d = parseInt(self.dom.moon.css('width'));
    var per,
        moonL = self.dom.moon.offset().left;
        moonR = moonL + d;
        sunL = self.dom.sun.offset().left;
        sunR = sunL + d;
    //两球没有接触
    if(sunL > moonR || moonL > sunR){
        per = 0;
    } else{
        //moon在sun右边
        if(sunL < moonL){
            per = (sunR - moonL)/d;
        //moon在sun左边            
        }else if(moonR >=sunL){
            per = (moonR - sunL)/d;
        }
    }
    self.change(per);   
}
//改变音乐声量
Index.prototype.change = function(per){
    var self = this;
    self.dom.audio[0].volume = per;
    self.dom.perc.html((per*100).toPrecision(4) + '%');//取4位小数
    self.dom.moon.css({//月亮颜色的变化
        'background': 'hsl(194,56%,'+(1-per)*60 +'%)'
    })
    $('body').css({//背景颜色的变化
        'background': 'hsl(' + (194 + Math.floor(166*per)) + ",66%,"+(1-per)*50+'%)'       
    })
}
new Index({'music':'music/summer.mp3'});
