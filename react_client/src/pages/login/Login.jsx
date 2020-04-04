import React, {Component} from "react";
import {Form, Input, Button, message} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";

import {reqLogin} from '../../api/index'
import "./login.less";
import storageUtils from "../../utils/storageUtils";

export default class Login extends Component {

    onFinish = async (values) => {      // 如果验证用户成功，就把用户信息保存到数据库中
        // console.log(values)

        const result = await reqLogin(values)
        // console.log(result);
        const {status, data, msg} = result
        // console.log(data)

        if (status === 0) {

            storageUtils.saveUser(data)
            message.success(msg);
            // 用户登录成功,并且跳转至 admin 组件
            // 如果人为在地址栏输入 /admin ，是不会跳转到 admin 组件的

            // 解决方案：登录成功时把用户信息存储到本地，一旦加载 admin 组件时就读取本地的用户信息，如果没有本地用户信息，则路由重定向到 /login ，如果有用户信息，则加载 admin 组件
            this.props.history.replace('/admin')
        } else {          // 用户登录失败
            message.error(msg);
        }
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
                            {min: 5, message: '用户名最少为5位'},
                            {max: 12, message: '用户名最多为12位'},
                            {required: true, message: "用户名不能为空"}
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="请输入用户名"
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {min: 5, message: '密码最少为5位'},
                            {max: 12, message: '密码最多为12位'},
                            {required: true, message: "密码不能为空"}
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
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
