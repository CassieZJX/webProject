var par = {
    rotateNum: 6,
    body: '.wrapper',
    clickCb: clickCbFun,
    renderCb: renderCbFun
}
var Lottery = new Lottery(par);
function clickCbFun() {
    var randomDeg = Math.floor(Math.random() * 360);
    Lottery.goRotate(randomDeg);
}
function renderCbFun(deg) {
    var str = "";
    if (deg >= 0 && deg < 45) {
        str = "一等奖";
    } else if (deg >= 45 && deg < 90 || deg >= 135 && deg < 180 || deg >= 225 && deg < 270 || deg >= 315 && deg < 360) {
        str = "幸运奖";
    }
    else if (deg >= 90 && deg < 135) {
        str = "四等奖";
    }
    else if (deg >= 180 && deg < 225) {
        str = "三等奖";
    }
    else if (deg >= 270 && deg < 315) {
        str = "二等奖";
    }
    alert(str);
}