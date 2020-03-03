var flag=true;
$('.box div').on('mousedown',function(e){
    if(flag){
        var that=this;
        var disX=e.offsetX;
        var disY=e.offsetY;
        var $clone=$(this).clone();
        $clone.addClass('draging').css({
            'left':$(this).position().left,
            'top':$(this).position().top,
        });
        $('.box').append($clone);
        $(this).addClass('moving').html("");
        $('.box').on('mousemove',function(e){
            $clone.css({
                'left':e.pageX-$(this).offset().left-disX,
                'top':e.pageY-$(this).offset().top-disY
            })
        });
        $clone.on('mouseup',function(){
            $('.box').off('mousemove');
            var minIndex=$(that).index();
            var minValue=1000;
            $('.box div').not(":last").each(function(){
                var smalldistance=Math.sqrt(Math.pow($clone.position().left-$(this).position().left,2)+
                Math.pow($clone.position().top-$(this).position().top,2));
                if(smalldistance<minValue){
                    minValue=smalldistance;
                    minIndex=$(this).index();
                }
            });
            if(minIndex==$(that).index()){
                $clone.animate($(that).position(),400,function(){
                    $(that).removeClass('moving').html($clone.html());
                    $(this).remove();
                    flag=true;
                })
            }else {
                var $minbox=$('.box div').eq(minIndex);
                var $clone2=$minbox.clone();
                $clone2.addClass('draging').css({
                    'left':$minbox.position().left,
                    'top':$minbox.position().top,
                })
                $('.box').append($clone2);
                $minbox.addClass('moving').html("");
                $clone.animate($minbox.position(),400,function(){
                    $minbox.removeClass('moving').html($clone.html());
                    $clone.remove();
                    flag=true;
                });
                $clone2.animate($(that).position(),400,function(){
                    $(that).removeClass('moving').html($clone2.html());
                    $clone2.remove();
                    flag=true;
                });
            }
        })
    }
})