//价格打印出NAN---->因为价格不是数字，在HTML中多加了个￥符号，所以data[i].money * data[i].num输出的是NAN
/*click 点击button --->出现购物车block-->bindEvent()
   对应增加一行(name money num num*money)  addHtml()
   +      click 对应加一
   -      click 对应减一 当前商品数量为0时，该行消失  bindSign()
   购物车无商品--->购物车消失
   总价改变  */
function Index() {
    this.dom = {
        rightBox: $('.rightBox'),
        tbody: $('.bodyBox'),
        totalMoney: $('.totalMoney'),
        addShop: $('.addShop')
    }
    this.obj = {
        money: 0,
        name: '',
        data: [],
        totalMoney: 0
    }
    this.bindEvent();
}
Index.prototype.bindEvent = function () {
    var self = this;
    self.dom.addShop.on('click', function () {
        var $this = $(this);
        self.dom.rightBox.css({ 'display': 'block' });
        self.obj.name = $this.siblings('.name').html();
        self.obj.money = $this.siblings('.money').html();
        self.addJson(self.obj);
        self.addHtml();
    })
}
Index.prototype.addJson = function (obj) {
    var self = this;
    var data = self.obj.data;
    for (var j = 0; j < data.length; j++) {
        if (data[j].name == obj.name) {
            data[j].num++;
            return
        }
    }
    data.push({
        name: obj.name,
        money: obj.money,
        num: 1
    });
    console.log(self.obj);
}
Index.prototype.addHtml = function () {
    var self = this;
    var data = self.obj.data;
    var tbody = self.dom.tbody;
    var totalMoney = self.obj.totalMoney;
    var textHtml = '';
    tbody.html('');
    for (var i = 0; i < data.length; i++) {
        textHtml += '<tr><td>' + data[i].name + '</td><td>' +
            data[i].money + '</td><td><a class="reduce">-</a>' +
            data[i].num + ' ';
        textHtml += '<a class="addNum">+</a></td><td>￥' +
        (data[i].money * data[i].num).toFixed(2) + '</td></tr>';
        totalMoney += data[i].money * data[i].num;
        console.log(data[i].money, data[i].num, totalMoney);
        self.dom.totalMoney.text('￥' + totalMoney.toFixed(2));
    }
    tbody.append(textHtml);
    self.bindSign();
}
Index.prototype.bindSign = function(){
    var self = this;
    var data = self.obj.data;
    $('.addNum').on('click',function(){
        var index = $(this).parents('tr').index();
        data[index].num ++;
        self.addHtml();
    });
    $('.reduce').on('click',function(){
        var index = $(this).parents('tr').index();
        data[index].num --;
        if(data[index].num ==0){
            data.splice(index,1);
        }
        if(data.length ==0){
            self.dom.totalMoney.text(0);
            self.dom.rightBox.css('display','none');
        }
        self.addHtml();
    })
   

}
new Index();
