import React from 'react'
import './appLogin.scss'
import imgUrl from "img/appLogin/landing_bg.png"
import { Form, Input, Button,message,Modal } from 'antd'
import axios from "@/tools/axiosTool"
import {connect} from "react-redux"
import action from "@/tools/react-redux/action"//拿到react-redux需要匹配进来的动作的object，也就是拿type

function mapStateToProps(state){
  return {
    drawType: state.luckydraw.drawType,
  }
}
function mapActionToProps(dispatch){
  return {
    set_draw_type: (type) => dispatch(action.set_draw_type(type)),
    set_login_count: (num) => dispatch(action.set_login_count(num)),
    set_login_Type: (type) => dispatch(action.set_login_Type(type)),
  }
}
const { confirm } = Modal;
let self;
class AppLogin extends React.Component {
  constructor(props) {
    super(props);
    self=this;
  }
  render() {
    const {getFieldDecorator}=self.props.form;
    return (
      <div className="appLogin">
        <img src={imgUrl} alt="error" className="headBg" />
        <div className="main">
          <h1 className="sysName">我该吃什么咯</h1>
          <div className="formBox">
            <h2 className="title">欢迎登录</h2>
            <div className="content">
              <Form onSubmit={this.login}>
                <div className="inputItem">
                  <div className="labe">
                    <span className="name">账号</span>
                  </div>
                  <Form.Item>
                    {getFieldDecorator('name', {
                      rules: [{ required: false, message: '账号不能为空!' }],
                    })(
                      <Input size="large" placeholder="请输入您的账号"/>
                    )}
                  </Form.Item>
                </div>
                <div className="inputItem">
                  <div className="labe">
                    <span className="name">密码</span>
                  </div>
                  <Form.Item>
                    {getFieldDecorator('psd', {
                      rules: [{ required: false, message: '密码不能为空' }],
                    })(
                    <Input size="large" placeholder="请输入您的密码" onPressEnter={this.login} />
                    )}
                  </Form.Item>
                </div>
                <Button className="confirmBtn"  htmlType="submit" type="primary">登录</Button>
              </Form>
            </div>
          </div>
          <p className="copyright">李韦飞（Liweifei19950111）版权所有</p>
        </div>
      </div>
    )
  }
  componentDidMount(){
    console.log(self.props);
    let luckydrawName = localStorage.getItem("luckydrawName");
    let luckydrawPsd = localStorage.getItem("luckydrawPsd");
    let luckydrawToken = localStorage.getItem("luckydrawToken");
    if (luckydrawName) self.props.form.setFieldsValue({"name":luckydrawName});
    if (luckydrawPsd) self.props.form.setFieldsValue({"psd":luckydrawPsd});
    if (luckydrawToken) axios.defaults.headers.common["Authorization"] = luckydrawToken;
  }
  login(e) {
    //登录
    e.preventDefault();
    const name=self.props.form.getFieldValue("name");
    const psd=self.props.form.getFieldValue("psd");
    if (!name|| !psd) {
      message.warning('请输入账号及密码！');
      return;
    }
    axios
      .post("/user/login", {
        name: encodeURI(name.trim()),
        psd: psd.trim()
      })
      .then(response => {
        // 登录成功后要跳转到首页，并传值过去
        if (response.data.type) {
          localStorage.setItem("luckydrawName", name);
          localStorage.setItem("luckydrawPsd", psd);
          localStorage.setItem("luckydrawToken", response.data.data.token);

          self.props.set_draw_type(response.data.data.drawType)
          self.props.set_login_count(response.data.data.loginCount)
          self.props.set_login_Type(true)
          console.log(self.props);
          // this.$commonType.drawType = response.data.data.drawType;
          // this.$commonType.loginCount = response.data.data.loginCount;

          axios.defaults.headers.common["Authorization"] =
            response.data.data.token;
          // this.$store.dispatch("setLoginType");//设置登录状态，避免点刷新的时候本页面显示无信息
          confirm({
            title: '提示',
            content: '未录数据?是否前往录入饭店数据？',
            okText:"确认",
            cancelText:"取消",
            onOk() {
              self.props.history.push({
                pathname: '/appAdditem'
              })
            },
            onCancel() {
              self.props.history.push({
                pathname: '/appMain'
              })
            },
          });
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        
        // message.error(error.response.data.msg);
      });
  }
}
AppLogin = Form.create({name:"AppLogin"})(AppLogin)
export default connect(mapStateToProps,mapActionToProps)(AppLogin);