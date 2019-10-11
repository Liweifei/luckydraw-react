//触发action动作  随后通过引入的dispatcher去dispatch相应事件
import * as actionType from "./actionType"//引入对应的action type
import store from "./store"//引入store 经过redux的createStore后的store默认含有dispatch方法
const action={
    COUNT_ADD(num){
        store.dispatch({
            type:actionType.COUNT_ADD,//也就是执行哪个动作（函数）
            num:num
        })
    },
    OTHER_CHANGE_NAME(name){
        store.dispatch({
            type:actionType.OTHER_CHANGE_NAME,//也就是执行哪个动作（函数）
            name:name
        })
    }
}
export default action