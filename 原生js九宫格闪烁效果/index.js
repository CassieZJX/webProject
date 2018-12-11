window.onload = function () {
    var btn = document.getElementById('btn'),
        cubeBox = document.getElementById('cubeBox');
    // console.log(btn);
    var cubes = cubeBox.getElementsByTagName('div'),
        colorArr = ['#960', 'green', 'pink', 'blue', '#369', 'perple', 'yellow', '#ccc', '#000'];
    ; var str = "",
        timer = null,
        flag = false;
    //创建9宫格
    for (var i = 0; i < 9; i++) {
        str += '<div></div>'
    };
    cubeBox.innerHTML = str;
    function twinkle() {
        flag = !flag;
        btn.innerHTML = "点击停止闪烁";
        if (flag) {
            timer = setInterval(function () {
                for (var i = 0; i < 3; i++) {
                    var num = Math.round(Math.random() * 8);//四舍五入
                    // console.log(num);
                    var obj = {};
                    //去重
                    if (typeof obj[num] !== "undefined") {
                        i--;
                        continue;
                    }
                    obj[num] = num;
                    //随机取格子更换颜色
                    cubes[num].style.backgroundColor = colorArr[num];
                    // console.log(cubes[num]);
                }
                //闪烁-->变回原来的颜色
                window.setTimeout(function () {
                    for (var j = 0; j < cubes.length; j++) {
                        cubes[j].style.backgroundColor = "#f40";
                    }
                }, 300)
            }, 800);
        } else {
            btn.innerHTML = "点击开始闪烁";
            clearInterval(timer);
        }
    }
    btn.onclick = twinkle;
}