import React from "react"
import "./appAdditem.scss"
import { Link } from "react-router-dom"
import axios from "@/tools/axiosTool"
import { Table, Divider, Rate, Modal, Form, Input, Select, Button, message } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
let self;
class appAdditem extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      tableData: [
        // {
        //   id: "1",
        //   name: "客户金融资产总额",
        //   isSelected:false,
        //   location: "已上线",
        //   score: 3,
        //   desc: "4,013,056"
        // }
      ],
      dialogVisible: false,
      dialogTitle: "新增饭店",
      isEdit: false,
      editId: null,
      isSelectArr: [
        {
          label: "是",
          value: 1
        },
        {
          label: "否",
          value: 0
        }
      ],
    }
  }
  render() {
    const { getFieldDecorator } = self.props.form;
    const columns = [
      {
        title: '饭店名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '饭店位置',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: '是否已吃',
        dataIndex: 'isSelected',
        key: 'isSelected',
        render: (text, record) => (
          record.isSelected ? "是" : "否"
        ),
      },
      {
        title: '评分等级',
        key: 'score',
        dataIndex: 'score',
        render: (text, record) => (
          <Rate disabled value={record.score} />
        ),
      },
      {
        title: '吃主备注',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={e => self.edit(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={e => self.del(record)}>删除</a>
          </span>
        ),
      },
    ];
    return (
      <div className="appAdditem">
        <div className="right">
          <div className="btnGroup">
            <Button icon="plus" onClick={this.handleAdd} type="primary">添加</Button>
            <Link to="/appMain">
              <Button icon="bank" type="primary">
                去选饭
              </Button>
            </Link>
          </div>
          <Table rowKey="_id" bordered columns={columns} dataSource={self.state.tableData} />
        </div>
        <Modal
          width="640px"
          okText="确定"
          cancelText="取消"
          title={self.state.dialogTitle}
          visible={this.state.dialogVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onSubmit={this.login}>
            <Form.Item label="饭店名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '饭店名称不能为空!' }],
              })(
                <Input size="large" placeholder="请输入饭店名称" />
              )}
            </Form.Item>
            <Form.Item label="饭店位置">
              {getFieldDecorator('location', {
                rules: [{ required: true, message: '' }],
              })(
                <Input size="large" placeholder="请输入饭店位置" onPressEnter={this.login} />
              )}
            </Form.Item>
            <Form.Item label="是否已吃">
              {getFieldDecorator('isSelected', {
                rules: [{ required: false, message: '' }],
              })(
                <Select
                  placeholder="请选择本饭店是否已吃"
                  onChange={this.handleSelectChange}
                >
                  {
                    self.state.isSelectArr.map((item, index) => {
                      return <Option key={index} value={item.value}>{item.label}</Option>
                    })
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="饭店评分">
              {getFieldDecorator('score', {
                rules: [{ required: false, message: '' }]
              })(
                <Rate />
              )}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator('desc', {
                rules: [{ required: false, message: '' }]
              })(
                <TextArea
                  placeholder="请输入备注"
                  autosize={{ minRows: 3, maxRows: 5 }}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
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
          tableData: response.data.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleAdd() {//添加
    console.log("Add");

    self.props.form.resetFields();
    // self.dialoogTitle = param === "add" ? "新增饭店" : "编辑饭店信息";
    // self.form.name = param === "add" ? "" : param.name;
    // self.form.location = param === "add" ? "" : param.location;
    // self.form.isSelected = param === "add" ? 0 : param.isSelected;
    // self.form.score = param === "add" ? 0 : param.score;
    // self.form.desc = param === "add" ? "" : param.desc;
    // self.isEdit = param === "add" ? false : true;
    // self.editId = param === "add" ? "" : param._id;

    self.setState({
      isEdit: false,
      editId: null,
      dialogVisible: true
    })
  }
  edit(info) {//编辑
    console.log(info);
    self.props.form.setFieldsValue({
      name: info.name,
      location: info.location,
      isSelected: info.isSelected,
      score: info.score,
      desc: info.desc,
    });
    self.setState({
      isEdit: true,
      editId: info._id,
      dialogVisible: true
    })
  }
  del(info) {//删除
    console.log(info);
    confirm({
      title: '确认添删除饭店么?',
      content: '删掉后不可恢复，请三思！',
      onOk() {
        let param = {
          _id: info._id
        };
        axios
          .post("/restaurant/delete", param)
          .then(function (response) {
            if (response.data.type) {
              self.getList();
              message.success('删除成功！');
            } else {
              message.error(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      onCancel() { },
    });
  }
  handleOk() {//添加确定
    const name = self.props.form.getFieldValue("name");
    if (!name) {
      message.warning('请输入饭店名称！');
      return;
    }
    const location = self.props.form.getFieldValue("location");
    if (!location) {
      message.warning('请输入饭店位置！');
      return;
    }
    let param = {
      name: name,
      location: location,
      isSelected: self.props.form.getFieldValue("isSelected"),
      score: self.props.form.getFieldValue("score"),
      desc: self.props.form.getFieldValue("desc")
    };
    if (self.state.isEdit) param._id = self.state.editId;
    let url = self.state.isEdit ? "/restaurant/update" : "/restaurant/save"; //新增编辑不同接口
    axios
      .post(url, param)
      .then(function (response) {
        if (response.data.type) {
          if (self.state.isEdit) {
            self.setState({
              isEdit: false,
              editId: null,
            })
          }
          self.handleCancel();
          self.getList();
          message.success(response.data.msg);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // const name=self.props.form.getFieldValue("name");
    // const psd=self.props.form.getFieldValue("psd");
  }
  handleCancel() {
    self.setState({
      dialogVisible: false,
    });
  }
}
appAdditem = Form.create({ name: 'appAdditem' })(appAdditem)
export default appAdditem;