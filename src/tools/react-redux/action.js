//组件在connct时需要的方法，返回一个object
import * as actionType from "./actionType"//引入对应的action type
const action={
    COUNT_ADD(num){
        //react-redux 匹配方法到组件需要返回的是object而不是像redux那样需要去dispatch

        // store.dispatch({
        //     type:actionType.COUNT_ADD,//也就是执行哪个动作（函数）
        //     num:num
        // })
        return {
            type:actionType.COUNT_ADD,//也就是执行哪个动作（函数）
            num:num
        }
    },
    OTHER_CHANGE_NAME(name){
        // store.dispatch({
        //     type:actionType.OTHER_CHANGE_NAME,//也就是执行哪个动作（函数）
        //     name:name
        // })
        return {
            type:actionType.OTHER_CHANGE_NAME,//也就是执行哪个动作（函数）
            name:name
        }
    },
    set_login_Type(loginType){//设置登录状态
        return {
            type:actionType.set_login_Type,//也就是执行哪个动作（函数）
            loginType:loginType
        }
    },
    set_draw_type(drawType){//设置抽奖状态
        return {
            type:actionType.set_draw_type,//也就是执行哪个动作（函数）
            drawType:drawType
        }
    },
    set_login_count(loginCount){//设置抽奖状态
        return {
            type:actionType.set_login_count,//也就是执行哪个动作（函数）
            loginCount:loginCount
        }
    }
}
export default action