(function () {
    var provinceNode = $('#province'),
        cityNode = $('#city'),
        schoolNode = $('#school');
    //省会
    var selectPstr = '';
    for (var i = 0, len = province.length; i < len; i++) {
        selectPstr += '<option value=' + province[i][0] + '>' + province[i][1] + '</option>'
    }
    selectPstr += '<option value="9999">其他</option>'
    provinceNode.html(selectPstr);

    //城市
    var selectCstr = '',
        cityArr = city[provinceNode.val()];
    // console.log(cityArr);
    for (var i = 0, len = cityArr.length; i < len; i++) {
        selectCstr += '<option value=' + cityArr[i][0] + '>' + cityArr[i][1] + '</option>'
    }
    selectCstr += '<option value="9999">其他</option>'
    cityNode.html(selectCstr);

    //院校
    var selectSstr = '',
        schoolArr = allschool[cityNode.val()];
    // console.log(schoolArr);
    for (var i = 0, len = schoolArr.length; i < len; i++) {
        selectSstr += '<option>' + schoolArr[i][2] + '</option>'
    }
    selectSstr += '<option value="9999">其他</option>'
    schoolNode.html(selectSstr);
    //省会联动
    provinceNode.change(function () {
        var provinceCurrent = provinceNode.val();
        selectCstr = '';
        cityArr = city[provinceCurrent];
        // console.log(cityArr);
        if (cityArr) {
            for (var i = 0, len = cityArr.length; i < len; i++) {
                selectCstr += '<option value=' + cityArr[i][0] + '>' + cityArr[i][1] + '</option>'
            }
            selectCstr += '<option value="9999">其他</option>'
            cityNode.html(selectCstr);
        }

    });

    cityNode.change(function () {
        var cityCurrent = cityNode.val();
        selectSstr = '';
        schoolArr = allschool[cityCurrent];
        // console.log(schoolArr);
        if (schoolArr) {
            for (var i = 0, len = schoolArr.length; i < len; i++) {
                selectSstr += '<option>' + schoolArr[i][2] + '</option>'
            }
            selectSstr += '<option value="9999">其他</option>'
            schoolNode.html(selectSstr);
        }
        else{
            selectSstr = '<option value="9999">其他</option>'
            schoolNode.html(selectSstr);
        }
    });
})()