import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import {reqLogin} from '../../api/index'
import "./login.less";
export default class Login extends Component {

    onFinish = (values)=>{      // 如果验证用户成功，就把用户信息保存到数据库中
        console.log(values,)

        reqLogin(values)
    }

    render() {
    return (
      <div className="login-form">
        <h2 className="login-title">React后台管理系统</h2>
        <Form
            onFinish={this.onFinish}
        >
          <Form.Item
            name='username'
            rules={[
                {min:5,message:'用户名最少为5位'},
                {max:12,message:'用户名最多为12位'},
                {required:true,message:"用户名不能为空"}
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
                {min:5,message:'密码最少为5位'},
                {max:12,message:'密码最多为12位'},
                {required:true,message:"密码不能为空"}
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block='true'
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// const WrappedNormalLoginForm = Form.create()(Login)
// export default WrappedNormalLoginForm
