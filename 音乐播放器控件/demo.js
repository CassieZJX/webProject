(function () {
    //获取音乐
    var audio = document.createElement('audio');
    var src = $('.active_song').attr('data-origin');
    audio.setAttribute('src', src);
    // console.log(audio);
    // audio.play();
    var timeLen = $('.play_timeLineBar').get(0).offsetWidth;//获取进度条长度
    var initTime = timeLen;
    // console.log(timeLen);

    //碟片旋转
    var t = new TimelineMax();
    t.to(
        '.player_cdData', 3,
        {
            rotation: '360deg',
            ease: Power0.easeNone,
            repeat: -1
        }, '-=0.2s'
    );
    t.pause();

    //点击播放暂停按钮的转换
    $('.player_play').click(function () {
        //暂停
        if ($('.player_play').hasClass('start')) {
            $(this).removeClass('start');
            //碟片恢复正常大小
            TweenMax.to(
                '.player_cdData', 0.2,
                {
                    scale: 1,
                    ease: Power0.easeNone,
                }
            );
            //背景幕布消失
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: 0,
                    ease: Power0.easeNone,
                }
            );
            t.pause();
            audio.pause();
        }
        //开始 
        else {
            $(this).addClass('start');
            //碟片变大
            TweenMax.to(
                '.player_cdData', 0.2,
                {
                    scale: 1.1,
                    ease: Power0.easeNone,
                }
            );
            //背景幕布的升起
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: '-50%',
                    ease: Power0.easeNone,
                }
            );
            t.play();
            audio.play();
        }
        durationLine();
        changeSongLrc();
    });

    $('.player_prev').click(function () {
        prev();
    });

    $('.player_next').click(function () {
        next();
    });

    //上一曲    
    function prev() {
        //点击上一首时当前已是第一首，则跳到最后一首
        if ($('.player_cdData.active_song').is(':first-child')) {
            // console.log('ok');
            $('.player_cdData.active_song').removeClass('active_song');
            $('.player_cdData:last-child').addClass('active_song');
            audioElementPlay();
        }
        //上一首不是第一首
        else {
            $('.player_cdData.active_song').removeClass('active_song').prev().addClass('active_song');
            audioElementPlay();
        }
    }
    //下一曲
    function next() {
        //点击下一首时当前已是最后一首，则跳到第一首
        if ($('.player_cdData.active_song').is(':last-child')) {
            // console.log('ok');
            $('.player_cdData.active_song').removeClass('active_song');
            $('.player_cdData:first-child').addClass('active_song');
            audioElementPlay();
        }
        //下一首不是最后一首
        else {
            $('.player_cdData.active_song').removeClass('active_song').next().addClass('active_song');
            audioElementPlay();
        }
    }

    //点击单曲循环
    // $('.singleloop').click(function () {
    //     audio.addEventListener('timeupdate', function () {
    //         var duration = this.duration;//获取这首歌的长度（以S为单位）
    //         var current = this.currentTime;//获取当前时间
    //         var percent = current / duration;
    //         //单曲循环
    //         if (percent == 1) {
    //             audio.setAttribute('src', $('.active_song').attr('data-origin'));
    //             audio.play();
    //         }
    //     });
    // })

    //点击上下时获取src并播放
    function audioElementPlay() {
        audio.setAttribute('src', $('.active_song').attr('data-origin'));
        audio.play();
        durationLine();
        changeSongLrc();
    };

    //进度条
    function durationLine() {
        audio.addEventListener('timeupdate', function () {
            var duration = this.duration;//获取这首歌的长度（以S为单位）
            var current = this.currentTime;//获取当前时间
            var percent = current / duration;
            // console.log(percent);
            $('.player_duration').css({
                width: parseInt(timeLen * percent)
            });
            //播完自动到下一首
            if (percent == 1) {
                next();
            }
        })
    };

    //背景幕布
    function changeSongLrc() {
        $('.songName').text($('.active_song').attr('data-song'));
        $('.auctor').text($('.active_song').attr('data-auctor'));
    }

})()
