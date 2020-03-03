(function () {
    var button = document.getElementsByTagName('button')[0],
        close = document.getElementsByClassName('close')[0],
        mask = document.getElementsByClassName('mask')[0],
        ulList = document.getElementsByTagName('ul')[0],
        logoBtn = document.getElementsByClassName('logo')[0],
        arrList = [];
    var min, index;
    close.onclick = function () {
        mask.style.display = 'none'
    };
    logoBtn.onclick = function () {
        mask.style.display = 'block'
    };
    //鼠标点击移动事件
    button.onmouseenter = function () {
        this.style.backgroundPosition = '0' + (-42) + 'px';
        this.onmouseleave = function () {
            this.style.backgroundPosition = '0 0px';
        }
    }
    button.onmousedown = function () {
        this.style.backgroundPosition = '0' + (-87) + 'px';
        createNum();
        this.onmouseup = function () {
            this.style.backgroundPosition = '0' + (-42) + 'px';
        }
    }
    //产生随机数
    function createNum() {
        var num = Math.floor(Math.random() * 100);
        if (min == num) { //不允许再出现当前最小数
            createNum();
            return false;
        }
        if (arrList.length > 9) {
            if (num > min && index == 0) {
                arrList.splice(1, 1);//如果第一个是最小数字则将第二个删除
            } else {
                arrList.shift();//超出10个将第一个数字删除
            }
        }
        arrList.push(num);//将随机数存到数组里
        // console.log(arrList);
        // console.log(arrList.min());
        min = arrList.min();
        index = arrList.indexOf(min);//取得当前最小数字的索引值index，为索引值为index的li赋上样式
        refurbishDom(arrList, index);
    };
    //刷新ul并给最小数字的li样式
    function refurbishDom(arr, index) {
        ulList.innerHTML = '';//记得清空ul内的内容
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            ulList.innerHTML += '<li>' + '扔出了一个' + arr[i] + '</li>';
        }
        ulList.getElementsByTagName('li')[index].className = "takeoutList";//为索引值为index的li赋上样式
    }
    //求最小数
    Array.prototype.min = function () {
        min = this[0];
        var len = this.length;
        for (var i = 0; i < len; i++) {
            if (min > this[i]) {
                min = this[i];
            }
        }
        return min;
    }
})()