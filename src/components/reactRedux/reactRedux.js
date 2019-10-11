import React from 'react'
import './reactRedux.scss'
import imgUrl from "img/appLogin/landing_bg.png"
import { Form, Input, Button, message, Modal } from 'antd'
import axios from "@/tools/axiosTool"

// user react-redux
import { connect } from 'react-redux';
import action from "@/tools/react-redux/action"//拿到react-redux需要匹配进来的动作的object，也就是拿type

function mapStateToProps(state) {//将state匹配到props中去
  return {
      num: state.normal.count,
      name: state.other.name
  }
}
function mapActionToProps(dispatch) {//将action匹配到props中去
  return {
    COUNT_ADD: (num) => dispatch(action.COUNT_ADD(num)),
    OTHER_CHANGE_NAME: (name) => dispatch(action.OTHER_CHANGE_NAME(name))
  }
}

const { confirm } = Modal;
let self;
class reactRedux extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }
  render() {
    console.log(this.props);
    
    const { getFieldDecorator } = self.props.form;
    return (
      <div className="appLogin">
        <i className="count">{self.props.num}----------{self.props.name}</i>
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
                      <Input size="large" placeholder="请输入您的账号" />
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
                <Button className="confirmBtn" htmlType="submit" type="primary">点击执行redux</Button>
              </Form>
            </div>
          </div>
          <p className="copyright">李韦飞（Liweifei19950111）版权所有</p>
        </div>
      </div>
    )
  }
  changeName(e) {
    console.log(e);
  }
  login(e) {
    //登录
    e.preventDefault();
    self.props.COUNT_ADD(1000);//执行dispatch
    self.props.OTHER_CHANGE_NAME("react-redux name had changed");//执行dispatch
    const name = self.props.form.getFieldValue("name");
    const psd = self.props.form.getFieldValue("psd");
    if (!name || !psd) {
      message.warning('请输入 账号 及 密码！');
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
          // this.$commonType.drawType = response.data.data.drawType;
          // this.$commonType.loginCount = response.data.data.loginCount;

          axios.defaults.headers.common["Authorization"] =
            response.data.data.token;
          // this.$store.dispatch("setLoginType");//设置登录状态，避免点刷新的时候本页面显示无信息
          confirm({
            title: '提示',
            content: '未录数据?是否前往录入饭店数据？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
              console.log('OK');
              // this.$router.push({
              //   path: "/appAdditem"
              // });
              self.props.history.push({
                pathname: '/appIndex'
              })
            },
            onCancel() {
              console.log('Cancel');
              // this.$router.push({
              //   path: "/appMain"
              // });
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
reactRedux = Form.create({})(reactRedux)
export default connect(mapStateToProps,mapActionToProps)(reactRedux);