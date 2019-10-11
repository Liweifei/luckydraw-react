// 定义state改变的规则即：store收到action后，必须给出新的state,这样view才会发生变化；这种state的计算过程就叫做reducer；
// reducer是一个纯函数，通过旧的state生成一个击算后的新state(注意，需要返回一个完整的state);注意，reducer并不能改变原state
//把reducer拆成多个后用combineReducers合并
import initState from "../state"

export default (state = initState.luckydraw, action) => {
    let newState;
    switch (action.type) {
        case "set_login_Type":
            newState={...state,loginType:action.loginType};
            break;
        case "set_draw_type":
            newState={...state,drawType:action.drawType};
            break;
        case "set_login_count":
            newState={...state,loginCount:action.loginCount};
            break;
        default:
            newState=state;
            break;
    }
    return newState;
}