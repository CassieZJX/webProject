var index = 1,
    prevIndex = 14,
    Speed = 300,
    Time,
    arr_length = 14,
    EndIndex = 1,//哪一格开始变速
    cycle = 0,//圈数
    EndCycle = 3,//计算圈数
    flag = false,
    random_num = 1,
    quick = 0;//加速
function StartGame() {
    $('#random_box li').removeClass('random_current');
    var num_random = Math.floor(Math.random() * 13);
    console.log(num_random);
    if (num_random > 5) {
        EndIndex = num_random - 5;
    } else {
        EndIndex = num_random + 14 - 5;
    }
    Time = setInterval(Star, Speed);
}
function Star() {
    if (flag == false) {
        if (quick == 5) {
            clearInterval(Time);
            Speed = 50;//变快
            console.log('快了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            Time = setInterval(Star, Speed);
        }
    }
    if (cycle == EndCycle + 1 && index - 1 == EndIndex) {
        clearInterval(Time);
        console.log('慢了------------------------------')
        Speed = 300;
        flag = true;
        Time = setInterval(Star, Speed);
    }
    if (index > arr_length) {
        index = 1;
        cycle++;
    }
    if (flag == true && index == parseInt(random_num)) {
        quick = 0;
        clearInterval(Time);
    }
    $('#random_' + index).addClass('random_current');
    if (index > 1) {
        prevIndex = index - 1;
    } else {
        prevIndex = arr_length;
    }
    $('#random_' + prevIndex).removeClass('random_current');
    index++;
    quick++;
    console.log("index" + index);
    // console.log("prevIndex"+prevIndex);
}