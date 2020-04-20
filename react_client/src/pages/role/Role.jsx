import React, {Component} from 'react';
import {Button, Card, Modal, Form, Input, message, Table} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {reqAddRole, reqGetRoles} from "../../api";

export default class Role extends Component {
    state = {
        visible: false,
        roles: []            // 存放所有角色
    };

    // 定义table组件的表头信息
    columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (create_time) => {
                return new Date(create_time).toLocaleString()
            }
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
        },

    ];

    componentDidMount() {
        this.getRoles()
    }

    getRoles = async () => {
        const result = await reqGetRoles()
        // console.log(result);
        const {status, msg, data} = result
        if (status === 0) { //如果获取分类成功
            // message.success(msg)
            this.setState({roles: data})
        } else {
            message.error(msg)
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 点击ok按钮时获取表单数据并添加数据
    addRole = async (values) => {
        // console.log(values)
        if (values) {         // 如果通过了前台验证，就向后台发起请求，将角色数据添加到数据库
            const result = await reqAddRole(values)       // roleName:xxx
            // console.log(result)
            const {status, msg} = result
            if (status === 0) {
                message.success(msg)
                this.setState({visible: false});
                this.getRoles()
            } else {
                message.error(msg)
                this.setState({visible: true});
            }
        }
    }

    handleOk = () => {
        this.form.submit()
    };

    handleCancel = () => {
        this.setState({visible: false,});
    };

    render() {
        const title = (
            <span>
                <Button type='primary' icon={<PlusOutlined/>} onClick={this.showModal}> 添加角色</Button>
                <Button type="primary" disabled={true} style={{marginLeft: 10}}>设置角色权限</Button>
            </span>
        )
        const {roles} = this.state
        // console.log(roles)
        return (
            <Card title={title}>
                <Table
                    dataSource={roles}  //数据源
                    columns={this.columns}       //每列的信息
                    rowKey='_id'        //必须要有的
                    // loading={loading}      //设置数据是否在加载中
                    bordered
                    pagination={{defaultPageSize: 3}}    //配置分页器
                />
                <Modal
                    title="请添加角色"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddRole setForm={(form) => this.form = form} onfinish={this.addRole}/>
                </Modal>
            </Card>
        );
    }
}

class AddRole extends Component {
    formRef = React.createRef()

    componentDidMount() {
        const form = this.formRef.current
        this.props.setForm(form)
    }

    render() {
        return (
            <Form
                ref={this.formRef}
                onFinish={this.props.onfinish}
            >
                <Form.Item
                    name='roleName'
                    rules={[
                        {required: true, message: "角色名不能为空"}
                    ]}

                >
                    <Input placeholder='请输入角色名称'></Input>
                </Form.Item>
            </Form>
        )
    }

}
