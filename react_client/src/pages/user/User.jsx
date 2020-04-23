import React, {Component} from 'react';
import {Button, Card, message, Modal, Table} from "antd";
import {PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import AddUser from "./AddUser";
import {reqGetRoles, reqAddUser, reqGteUsers, reqUpdateUser, reqDeteleUser} from "../../api";
import MyButton from "../../components/my-button/MyButton";
import {PAGE_NUMBER} from '../../utils/constans'
import './table.less'

const {confirm} = Modal
export default class User extends Component {
    state = {
        visible: false,
        roles: [],
        users: [],           // 存放所有用户信息
        roleName: {},        // {角色id：角色名}
        loading: true,
    };

    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (create_time) => {
                return new Date(create_time).toLocaleString()
            },
            align: 'center'
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            align: 'center'
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            render: (role_id) => this.state.roleName[role_id],
            align: 'center'
        },
        {
            title: '操作',
            width: 300,
            render: (user) => {
                // console.log(user);//render函数的参数 是对应行的数据源
                return (
                    <span>
                        <MyButton onClick={() => this.showUpdate(user)} style={{marginRight: 20}}>修改</MyButton>
                        <MyButton onClick={() => this.showDelete(user)}>删除</MyButton>
                        </span>
                )
            },
            align: 'center'
        }
    ];

    // 展示添加用户信息页面
    showAddModal = () => {
        this.user = null
        this.setState({
            visible: true,
        });
    };

    // 展示修改用户信息页面
    showUpdate = (user) => {
        this.user = user
        // console.log(user)
        this.setState({visible: true})
    }

    // 展示删除用户信息页面
    showDelete = (user) => {
        confirm({
            title: `你确定要删除用户${user.username}么？`,
            icon: <ExclamationCircleOutlined/>,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {        // 删除用户信息
                const result = await reqDeteleUser(user)
                const {status, msg} = result
                if (status === 0) {
                    message.success(msg)
                    this.getData()
                }
            },
            onCancel() {
                console.log('cancel')
            }


        })
    }

    // 点击ok按钮，添加用户信息
    addOrUpdateUser = async (values) => {
        // console.log(values)
        if (values) {         // 如果通过了前台验证，就向后台发起请求，将用户数据添加到数据库

            let result = null;
            if (this.user) {      // 如果是修改页面
                values._id = this.user._id
                result = await reqUpdateUser(values)
            } else {          // 如果是添加页面
                result = await reqAddUser(values)
            }
            // console.log(result)
            const {status, msg} = result
            if (status === 0) {
                message.success(msg)
                this.form.resetFields()
                this.setState({visible: false});
                this.getData()
            } else {
                message.error(msg)
                this.setState({visible: true});
            }
        }
    }

    handleOkAdd = () => {
        this.form.submit()
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        // this.getRoles()
        // this.getUsers()
        this.getData()
    }

    getData = async () => {
        this.setState({loading: true})
        const result = await Promise.all([reqGetRoles(), reqGteUsers()])
        this.setState({loading: false})
        // console.log(result)
        this.setState({
            roles: result[0].data,
            users: result[1].data
        })
        this.initRoles()
    }

    // 初始化角色信息（将roles._id 和 roles.name 整合）
    initRoles = () => {
        // console.log(this.state.roles)
        const roleName = this.state.roles.reduce((pre, next) => {
            pre[next._id] = next.name
            return pre
        }, {})
        // console.log(this.roleName)
        this.setState({roleName})
    }

    // 获取所有角色信息
    // getRoles = async () => {
    //     const result = await reqGetRoles()
    //     // console.log(result);
    //     const {status, msg, data} = result
    //     if (status === 0) { //如果获取角色列表成功
    //         // message.success(msg)
    //         this.setState({roles: data})
    //     } else {
    //         message.error(msg)
    //     }
    // }

    // 获取所有用户信息
    // getUsers = async () =>{
    //     const result = await reqGteUsers()
    //     // console.log(result);
    //     const {status, msg, data} = result
    //     if (status === 0) { //如果获取用户列表成功
    //         // message.success(msg)
    //         this.setState({users: data})
    //     } else {
    //         message.error(msg)
    //     }
    // }

    render() {
        const {roles, users, loading} = this.state
        // console.log(this.user)
        const {user} = this
        const title = (
            <span>
                <Button type='primary' icon={<PlusOutlined/>} onClick={this.showAddModal}> 添加用户</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    dataSource={users}  //数据源
                    columns={this.columns}       //每列的信息
                    rowKey='_id'        //必须要有的
                    loading={loading}      //设置数据是否在加载中
                    bordered
                    rowClassName={'table'}
                    pagination={{defaultPageSize: PAGE_NUMBER}}    //配置分页器
                />
                <Modal
                    title={this.user ? "请修改用户" : "请添加用户"}
                    visible={this.state.visible}
                    onOk={this.handleOkAdd}
                    onCancel={this.handleCancel}
                >
                    <AddUser
                        setForm={(form) => this.form = form}
                        onfinish={this.addOrUpdateUser}
                        roles={roles}
                        user={user}
                    />
                </Modal>
            </Card>
        );
    }
}
