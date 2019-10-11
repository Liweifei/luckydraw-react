import React from "react"
import { connect } from "react-redux"//redux用
import { Redirect } from "react-router-dom"//重定向路由用
function mapStateToProps(state) {
    return {
        loginType: state.luckydraw.loginType
    }
}
//fromComponent=>需要处理的组件
export default (FromComponent) => {
    class EnhancedComponent extends React.Component {
        render() {//登录则返回对应组件，否则重定向到登录组件
            return (
                this.props.loginType ?
                    <FromComponent {...this.props} /> :
                    <Redirect to='/' />
            )
        }
    }
    return connect(mapStateToProps)(EnhancedComponent);
}