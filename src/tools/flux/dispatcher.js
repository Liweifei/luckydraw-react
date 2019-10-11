//接收到触发action分发过来的事件（dispatch），处理相应的state
import { Dispatcher } from "flux";
import store from "./store"
const dispatcher = new Dispatcher();
dispatcher.register((actions) => {
    switch (actions.type) {
        case "addCount":
            console.log(actions.num);
            store.state.count+=actions.num;
            break;
        default:break;
    }
})
export default dispatcher