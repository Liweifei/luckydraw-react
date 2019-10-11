// 存储数据或者说是状态的容器，整个应用中只能有一个store;Redux提供createStore这个函数来生成store。
// store.dispatch()是View发出action的唯一方法,store.dispatch接受一个 action 对象作为参数，将它发送出去

//通过store.getState()获取state数据
//通过store.dispatch()去分发命令
//通过store.subscribe()去监测state的更新

import {createStore} from "redux"
import reducer from "./reducer"
const store =createStore(reducer);
export default store