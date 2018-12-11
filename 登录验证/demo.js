var btn = $('.btn-login'),
    oUser = $('.user')[0],
    oKey = $('.key')[0],
    oError = $('.error');
    regUser = /^[1]\d{10}$/g;//11位手机号
    regKey = /^[A-Z]\w{5,}/g;//密码以大写字母开头不少于6位
    btn.on('click',function(){
        var userName = oUser.value;
        var passWord = oKey.value;
        if(regUser.test(userName) && regKey.test(passWord)){
            btn.text('登录中.....');
        }else{
            oError.removeClass('hide');
        }
    });
    $('ul').on('click',function(){
        btn.text('登录');
        oError.addClass('hide');
    });