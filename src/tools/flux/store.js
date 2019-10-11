const EventEmitter = require("events").EventEmitter;
const store={
    ...EventEmitter.prototype,//解构on emit等方法
    state:{
        count:1
    },
    getState(){//获取state
        return this.state;
    }
}
export default store