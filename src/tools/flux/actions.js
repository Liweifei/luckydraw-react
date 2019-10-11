//触发action动作  随后通过引入的dispatcher去dispatch相应事件
import dispatcher from "./dispatcher"
const actions={
    addCount(num){
        console.log("zz");
        dispatcher.dispatch({
            type:"addCount",//也就是执行哪个动作（函数）
            num:num
        })
    }
}
export default actions