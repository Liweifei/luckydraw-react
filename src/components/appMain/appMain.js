import React from "react"
import "./appMain.scss"
import { Link } from "react-router-dom"
import axios from "@/tools/axiosTool"
import { connect } from "react-redux"
import action from "@/tools/react-redux/action"//拿到react-redux需要匹配进来的动作的object，也就是拿type
import jumpGif from "img/jump.gif"
import { Modal, Button, message } from 'antd';
const { confirm } = Modal;

function mapStateToProps(state) {
  return {
    drawType: state.luckydraw.drawType,
    loginCount: state.luckydraw.loginCount,
  }
}
function mapActionToProps(dispatch) {
  return {
    set_draw_type: (type) => dispatch(action.set_draw_type(type)),
  }
}

let self;
class appMain extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    self.data = {
      thisNum: null,
      interval: null, //循环器
      intervalSpeed: 300,
      canSelectList: [],
      intervalNum: 0, //100 end
      allLength: 0,
    }
    self.state = {
      list: [],
    }
  }
  render() {
    return (
      <div className="appMain">
        <h1 className="loginCount">
          累计登录次数<br />{self.props.loginCount}
        </h1>
        <Link to="/appAddItem">
          <span className="goAddItem">去加饭店</span>
        </Link>
        <img src={jumpGif} alt="error" className="jumpGif" style={{ display: self.props.drawType ? "block" : "none" }} />
        <div className="containMain">
          <ul className="list">
            {
              self.state.list.map((item, index) => {
                return (
                  <li
                    className={["item", item.isSelected ? "disabled" : null, index == self.data.thisNum ? "selected" : null, item.isToday ? "isToady" : null].join(' ')}
                    key={index}
                  >
                    <p className="label">{item.name}</p>
                  </li>
                )
              })
            }
            <li className="startBtn" onClick={self.draw}>走起</li>
          </ul>
          <ul className="cricle">
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
            <li className="cricleItem"></li>
          </ul>
        </div >
      </div >
    )
  }
  componentDidMount() {
    self.getList();
  }
  getList() {
    //获取饭店列表
    axios
      .get("/restaurant/list")
      .then(function (response) {
        self.setState({
          list: response.data.data.map(item => {
            item.selected = false;
            return item;
          })
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  draw() {
    if (self.state.list.length < 1) {
      confirm({
        title: '提示',
        content: '未录数据?是否前往录入饭店数据？',
        onOk() {
          self.props.history.push({
            path: "/appAdditem"
          });
        },
        onCancel() { },
      });
      return;
    }
    if (self.props.drawType) {
      message.warning('狗子！冷静！你要吃几顿？');
      return;
    }
    //开始抽奖
    self.data.canSelectList = [];
    self.state.list.forEach((item, index) => {
      if (!!!item.isSelected) {
        self.data.canSelectList.push(index)
      }
    });
    self.data.allLength = self.data.canSelectList.length - 1;
    if (self.data.canSelectList.length < 1) {
      message.warning('已无可选项了哦！');
      return;
    } else if (self.data.canSelectList.length == 1) {
      //如果只剩一个，直接选中，直接提交，不用再动画
      self.data.thisNum = self.data.canSelectList[self.data.allLength];
      self.drawThisData();
      return;
    }
    self.data.interval = setInterval(self.intervalF, self.data.intervalSpeed)
  }
  intervalF() {
    self.forceUpdate();
    clearInterval(self.data.interval);
    if (self.data.intervalNum == 100) {
      self.data.canSelectList = [];
      self.data.intervalNum = 0;
      self.drawThisData();
      return;
    }
    self.data.intervalNum++;
    if (self.data.intervalNum < 10) {
      self.data.intervalSpeed -= 30;
    }
    if (self.data.intervalNum > 85) {
      self.data.intervalSpeed += 20;
    }
    self.data.thisNum = self.data.canSelectList[Math.round(Math.random() * self.data.allLength)];
    self.data.interval = setInterval(self.intervalF, self.data.intervalSpeed);
  }
  drawThisData() {
    //推送数据到远程
    axios
      .post("/restaurant/draw", {
        _id: self.state.list[self.data.thisNum]._id
      })
      .then(response => {
        // 成功选中此餐厅
        if (response.data.type) {
          self.props.set_draw_type(true);
          if (response.data.data.type == "havedrawed") {
            message.warning('发生了新的抽选！');
            self.data.thisNum = null;
            self.getList();
          }
        } else {
          self.data.thisNum = null;
          message.error(response.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
export default connect(mapStateToProps, mapActionToProps)(appMain);