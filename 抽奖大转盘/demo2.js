class EventEmitter {
    constructor() {
        this._events = {};
    }
    on(event,callback) {
        //监听event事件,触发时调用callback函数
        let callbacks = this._events[event] || [];
        callbacks.push(callback);
        this._events[event] = callbacks;
        return this;
    }
    off(event,callback) {
        //停止监听event事件
        let callbacks = this._events[event];
        this._events[event] = callbacks && callbacks.filter(fn => fn !== callback);
        return this;
    }
    emit(event, ...args) {
        //触发事件,并把参数传给事件的处理函数
        const callbacks = this._events[event];
        callbacks.forEach(fn => fn.apply(null,args));
        return this;
    }
}

//调用：
//实例化
const eve = new EventEmitter();

//定义事件
function myEvent1(data) {
    console.log('事件1触发了');
    console.log(data);
}
//监听
 eve.on('myEve1',myEvent1);

//移除
eve.off('myEve1',myEvent1);

//触发
eve.emit('myEve1',['哈哈','嘻嘻']);