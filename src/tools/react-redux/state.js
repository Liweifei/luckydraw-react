//store对象中的定义的初始数据(初始状态)
const state={
    normal:{
        count:0
    },
    other:{
        name:"other reducer for react-redux"
    },
    luckydraw:{//此项目用
        loginType:false,
        drawType:true,//是否已抽奖
        loginCount:1,//登录次数
    }
}
export default state