import React, {Component} from 'react';
import {Form, Input, Select} from 'antd'

const {Item} = Form
const {Option} = Select

export default class AddUser extends Component {
    formRef = React.createRef()

    componentDidMount() {
        const form = this.formRef.current
        this.props.setForm(form)
    }

    render() {
        const formItemLayout = {
            labelCol: {             // 文字占据的比例（一共为24份）
                sm: {span: 6,},
            },
            wrapperCol: {           // 标签组件占据的比例（一共为24份）
                sm: {span: 12,},
            },
        };
        // console.log(this.props.roles)
        let {roles,user} = this.props
        user = user||{}
        // console.log(user)
        return (
            <Form
                {...formItemLayout}
                ref={this.formRef}
                onFinish={this.props.onfinish}
                initialValues={user}
            >
                <Item
                    name='username'
                    rules={[
                        {required: true, message: "用户名不能为空"}
                    ]}
                    label={'用户名'}
                    >
                    <Input placeholder='请输入用户名称'></Input>
                </Item>
                <Item
                    name='password'
                    rules={[
                        {required: true, message: "密码不能为空"}
                    ]}
                    label={'密码'}
                >
                    <Input.Password placeholder='请输入密码'></Input.Password>
                </Item>
                <Item
                    name='phone'
                    rules={[
                        {required: true, message: "手机号不能为空"}
                    ]}
                    label={'手机号'}
                >
                    <Input placeholder='请输入用户手机'></Input>
                </Item>
                <Item
                    name='role_id'
                    rules={[
                        {required: true, message: "角色不能为空"}
                    ]}
                    label={'角色'}
                >
                    <Select>
                        {
                            roles.map(item => {
                                return <Option
                                    key={item._id}
                                    value={item._id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Item>
            </Form>
        );
    }
}
