var shadow = document.getElementsByClassName('shadow')[0],
    show = document.getElementsByClassName('show')[0],
    img = document.getElementsByClassName('showImg')[0],
    oLi = document.getElementsByTagName('li'),
    close = document.getElementsByClassName('btn-close')[0],
    prev = document.getElementsByClassName('btn-prev')[0],
    next = document.getElementsByClassName('btn-next')[0];
bindEvent();
function bindEvent() {
    var n;
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onclick = function () {
            n = this.index;
            // console.log(this.index);
            showImg(this.index);
        }
    }
    close.onclick = function () {
        shadow.style.display = 'none';
        show.style.display = 'none';
    };
    prev.onclick = function () {
        if (n <= 0) {
            n = oLi.length - 1;
        } else {
            n--;
        }
        showImg(n);
    };
    next.onclick = function () {
        if (n >= oLi.length - 1) {
            n = 0;
        } else {
            n++;
        }
        showImg(n);
    };
};
function showImg(index) {
    shadow.style.display = 'block';
    show.style.display = 'block';
    var src = oLi[index].children[0].getAttribute('src');
    img.setAttribute('src', src);
}