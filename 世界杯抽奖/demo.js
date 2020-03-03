var xinm = new Array();
xinm[0] = "林黛玉";
xinm[1] = "贾宝玉";
xinm[2] = "唐僧";
xinm[3] = "成哥";
xinm[4] = "猪八戒";
xinm[5] = "邓哥";
xinm[6] = "刘德华";
xinm[7] = "梅艳芳";
xinm[8] = "小燕子";
xinm[9] = "苍井空";
xinm[10] = "梁河";
xinm[11] = "张书梅";
xinm[12] = "舒青阳";
xinm[13] = "关羽";
xinm[14] = "刘备";
xinm[15] = "曹操";
xinm[16] = "曾小贤";
xinm[17] = "胡一菲";
xinm[18] = "吕小布";

var phone = new Array();
phone[0] = "15653254789";
phone[1] = "15613254789";
phone[2] = "17893252509";
phone[3] = "12485788789";
phone[4] = "14573254709";
phone[5] = "15613258889";
phone[6] = "15611254729";
phone[7] = "15613854249";
phone[8] = "15613257969";
phone[9] = "12613254689";
phone[10] = "15614254789";
phone[11] = "15613274229";
phone[12] = "15245254789";
phone[13] = "19613259879";
phone[14] = "17613254679";
phone[15] = "15616654679";
phone[16] = "14533254769";
phone[17] = "15673254789";
phone[18] = "15612226549";



//设置一个毫秒数，倒计时
var endDate = 5000;
var second = parseInt(endDate / 1000) % 60;//秒
var minute = parseInt(endDate / 1000 / 60) % 60;//分
var hour = parseInt(endDate / 1000 / 60 / 60) % 24;//时
var day = parseInt(endDate / 1000 / 60 / 60 / 24) % 24;//天

// $('.count_down .second').html(second);
// $('.count_down .minute').html(minute);
// $('.count_down .hour').html(hour);
// $('.count_down .day').html(day);

//显示两位数
if (second < 10) {
    $('.count_down .second').html('0' + second);
}
if (minute < 10) {
    $('.count_down .minute').html('0' + minute);
}
if (hour < 10) {
    $('.count_down .hour').html('0' + hour);
}
if (day < 10) {
    $('.count_down .day').html('0' + day);
}

//倒计时
var timeRun = setInterval(function () {
    second--;
    if (second < 0) {
        minute = minute - 1;
        second = 59;
        if (minute < 0) {
            hour = hour - 1;
            minute = 59;
            if (hour < 0) {
                day = day - 1;
                hour = 23;
            }
        }
    }
    $('.count_down .second').html(second);
    $('.count_down .minute').html(minute);
    $('.count_down .hour').html(hour);
    $('.count_down .day').html(day);
    //全部小于0，倒计时停止
    if (second <= 0 && minute <= 0 && hour <= 0 && day <= 0) {
        clearInterval(timeRun);
        $('.count_down').html('正在抽奖中，请稍候。。。。')
        start();
    }
    //显示两位数
    if (second < 10) {
        $('.count_down .second').html('0' + second);
    }
    if (minute < 10) {
        $('.count_down .minute').html('0' + minute);
    }
    if (hour < 10) {
        $('.count_down .hour').html('0' + hour);
    }
    if (day < 10) {
        $('.count_down .day').html('0' + day);
    }
}, 1000);

//循环参加抽奖人数
var nametxt = $('.name'),
    phonetxt = $('.phone'),
    pcount = xinm.length - 1,
    running = true,
    td = 10,//共10个名额
    num = 0,
    gundong;//随机滚动

//循环参加名单
function startNum() {
    //实时更新名单
    pcount = xinm.length - 1;
    num = Math.floor(Math.random() * pcount);
    nametxt.html(xinm[num]);
    phonetxt.html(phone[num]);
    gundong = setTimeout(startNum, 0);
}

//时间结束开始循环
function start() {
    if (running) {
        running = false;
        startNum();
    };
    var timing = setInterval(function () {
        time = timing;
        zd();
    }, 1000);
}
//抽取10个人
function zd() {
    if (td < 2) {
        clearInterval(time);
        // clearInterval(gundong);
        // gundong=0;
        // running=true;
        stop();
        $('.count_down').html('抽奖结束，恭喜获奖者');
    }
    if (td >= 1) {//正好是最后一个人时
        clearInterval(time);
        // clearInterval(gundong);
        // gundong=0;
        stop();
        $('.list').prepend('<p>' + td + xinm[num] + '__' + phone[num] + '</p>');
        td -= 1;
    }
    if (td > 0) {
        // startNum();
        // //停止时间
        // var timing=function(){
        //     time=timing;
        // };
        // setTimeout(timing,0);
        setTimeout(reset, 2000);
    }
    //删除抽中的
    xinm.splice($.inArray(xinm[num], xinm), 1);
    phone.splice($.inArray(phone[num], phone), 1);
}
//每次抽奖结束停顿
function reset() {
    startNum();
    var timing = setInterval(function () {
        time = timing;
        zd();
    }, 1000);
}
function stop() {
    clearInterval(gundong);//停止滚动
    gundong = 0;
}
