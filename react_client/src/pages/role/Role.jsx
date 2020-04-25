import React, {Component} from 'react';
import {Button, Card, Modal, Form, Input, message, Table} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {reqAddRole, reqGetRoles, reqUpdateRole} from "../../api";
import UpdateRole from "./UpdateRole";
import storageUtils from "../../utils/storageUtils";
import {PAGE_NUMBER} from "../../utils/constans";
import MyButton from "../../components/my-button/MyButton";
import '../user/table.less'

export default class Role extends Component {

    constructor(props) {
        super(props);
        this.menus = React.createRef()
    }

    state = {
        showAdd: false,
        showUpdate: false,
        roles: [],            // 存放所有角色
        selectedRowKeys: [],
        role: {},                // 存储选中的角色信息
        loading:true,
    };

    // 定义table组件的表头信息
    columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            align:'center'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (create_time) => {
                return new Date(create_time).toLocaleString()
            },
            align:'center'
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            render: (auth_time) => {
                if (auth_time) {
                    return new Date(auth_time).toLocaleString()
                }
            },
            align:'center'
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
            align:'center'
        },
        {
            title: '操作',
            width: 300,
            render: (role) => {
                // console.log(role);//render函数的参数 是对应行的数据源
                return (
                    <span>
                        <MyButton style={{marginRight:20}}>修改</MyButton>
                        <MyButton>删除</MyButton>
                        </span>
                )
            },
            align:'center'
        }


    ];

    componentDidMount() {
        this.getRoles()
    }

    getRoles = async () => {
        this.setState({loading:true})
        const result = await reqGetRoles()
        this.setState({loading:false})
        // console.log(result);
        const {status, msg, data} = result
        if (status === 0) { //如果获取分类成功
            // message.success(msg)
            this.setState({roles: data})
        } else {
            message.error(msg)
        }
    }

    showAddModal = () => {
        this.setState({
            showAdd: true,
        });
    };

    showUpdateModal = () => {
        this.setState({
            showUpdate: true,
        });
    }

    // 点击ok按钮时获取表单数据并添加数据
    addRole = async (values) => {
        // console.log(values)
        if (values) {         // 如果通过了前台验证，就向后台发起请求，将角色数据添加到数据库
            const result = await reqAddRole(values)       // roleName:xxx
            // console.log(result)
            const {status, msg} = result
            if (status === 0) {
                message.success(msg)
                this.setState({showAdd: false});
                this.getRoles()
            } else {
                message.error(msg)
                this.setState({showAdd: true});
            }
        }
    }

    handleOkAdd = () => {
        this.form.submit()
        // console.log(this.form)
        // this.form.resetFields()
    };

    // 点击ok按钮就更新角色权限信息
    handleOkUpdate = async () => {
        // console.log('更新',this.menus.current.state.checkedKeys)
        const {role} = this.state

        // 收集权限信息  授权人信息  授权时间
        role.menus = this.menus.current.state.checkedKeys
        const user = storageUtils.getUser()
        role.auth_name = user.username
        role.auth_time = new Date()
        // console.log(role)

        const result = await reqUpdateRole(role)
        // console.log(result)
        const {status, msg} = result
        if (status === 0) {     // 如果修改权限成功
            /*
                修改权限时的判断：
                    1.如果登录的用户修改了当前用户所属角色的权限，就立即退出admin组件到login组件
            */
            if(user.role_id===role._id){
                message.success('当前用户的权限已被修改')
                storageUtils.removeUser()
                this.props.history.replace('/login')
            }else{
                message.success(msg)
                this.setState({showUpdate: false})
            }
        } else {
            message.error(msg)
            this.setState({showUpdate:true})
        }
        this.getRoles()
    };

    handleCancel = () => {
        this.setState({
            showAdd: false,
            showUpdate: false,
        });
    };

    // 设置行属性
    onRow = role => ({
        // 点击每一行会触发，role为每一行的信息
        onClick: () => this.setState({
            selectedRowKeys: [role._id],
            role
        })
    })

    render() {
        const {roles, role,loading} = this.state
        // console.log(roles)
        const title = (
            <span>
                <Button type='primary' icon={<PlusOutlined/>} onClick={this.showAddModal}> 添加角色</Button>
                <Button type="primary" disabled={!role._id} style={{marginLeft: 10}}
                        onClick={this.showUpdateModal}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    dataSource={roles}  //数据源
                    columns={this.columns}       //每列的信息
                    rowKey='_id'        //必须要有的
                    loading={loading}      //设置数据是否在加载中
                    bordered
                    rowClassName={'table'}
                    pagination={{defaultPageSize: PAGE_NUMBER}}    //配置分页器
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: this.state.selectedRowKeys,
                        // onChange:(selectedRowKeys)=>{           // 点击单选按钮触发，数据源对应的 _id
                        //     // console.log(selectedRowKeys)
                        //     this.setState({selectedRowKeys})
                        // }
                    }}
                    onRow={this.onRow}
                />
                <Modal
                    title="请添加角色"
                    visible={this.state.showAdd}
                    onOk={this.handleOkAdd}
                    onCancel={this.handleCancel}
                >
                    <AddRole setForm={(form) => this.form = form} onfinish={this.addRole}/>
                </Modal>
                <Modal
                    title="请修改角色"
                    visible={this.state.showUpdate}
                    onOk={this.handleOkUpdate}
                    onCancel={this.handleCancel}
                >
                    <UpdateRole role={role} ref={this.menus}/>
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
