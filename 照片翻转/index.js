var oLi = $('li');
var arr = [];
Array.prototype.slice.call(oLi,0).forEach(function(item,index){
    arr.push(upDate(item));
    bindEvent(item,index);
})
console.log(arr)
//初始WHLT
function upDate(item){
    return {
        w:item.offsetWidth,
        h:item.offsetHeight,
        l:item.offsetLeft,
        t:item.offsetTop,
    }
}
function bindEvent(item,index){
    $(item).on('mouseenter',function(e){/* 鼠标进入 */
        // console.log('in');
        // getDer(e,index)
        addClass(e,index,'in',item)
    })
    $(item).on('mouseleave',function(e){/* 鼠标离开 */
        // getDer(e,index)
        addClass(e,index,'out',item)
    })
}
function addClass(e,index,state,item){
    var d = getDer(e,index);
    var class_add = '';
    switch(d){
        case 0:
        class_add = '-top';
        break;
        case 1:
        class_add = '-right';
        break;
        case 2:
        class_add = '-bottom';
        break;
        case 3:
        class_add = '-left';
        break;
    }
    item.className = '';
    item.classList.add(state + class_add);
    console.log(state + class_add);
}
function getDer(e,index){
    var w = arr[index].w,
        h = arr[index].h,
        x = e.pageX - arr[index].l - w/2,
        y = e.pageY - arr[index].t - h/2;
        d = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;/* d的值为NaN */
        console.log(d);
        return d;
}