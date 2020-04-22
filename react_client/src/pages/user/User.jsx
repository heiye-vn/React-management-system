import React, {Component} from 'react';
import {Button, Card, message, Modal, Table} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import AddUser from "./AddUser";
import {reqGetRoles, reqAddUser,reqGteUsers} from "../../api";
import MyButton from "../../components/my-button/MyButton";
import {PAGE_NUMBER} from '../../utils/constans'

class User extends Component {
    state = {
        showAdd: false,
        roles:[],
        users:[],           // 存放所有用户信息
        roleName:{},        // {角色id：角色名}
        user:[],            // 存放单个用户信息
    };

    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (create_time) => {
                return new Date(create_time).toLocaleString()
            }
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            render: (role_id) =>this.state.roleName[role_id]
        },
        {
            title: '操作',
            width: 300,
            render: (user) => {
                // console.log(user);//render函数的参数 是对应行的数据源
                return (
                    <span>
                        <MyButton onClick={()=>this.showUpdate(user)}>修改</MyButton>
                        <MyButton>删除</MyButton>
                        </span>
                )
            }
        }
    ];

    showAddModal = () => {
        this.setState({
            showAdd: true,
        });
    };

    // 展示修改用户信息页面
    showUpdate = ()=>{
        this.setState({showAdd:true})
    }

    // 点击ok按钮，添加用户信息
    addUser = async (values) => {
        // console.log(values)
        if (values) {         // 如果通过了前台验证，就向后台发起请求，将用户数据添加到数据库
            const result = await reqAddUser(values)
            // console.log(result)
            const {status, msg} = result
            if (status === 0) {
                message.success(msg)
                this.form.resetFields()
                this.setState({showAdd: false});
                this.getData()
            } else {
                message.error(msg)
                this.setState({showAdd: true});
            }
        }
    }

    handleOkAdd = () =>{
        this.form.submit()
    }

    handleCancel = () => {
        this.setState({
            showAdd: false,
        });
    };

    componentDidMount() {
        // this.getRoles()
        // this.getUsers()
        this.getData()
    }

    getData = async () =>{
        const result = await Promise.all([reqGetRoles(),reqGteUsers()])
        // console.log(result)
        this.setState({
            roles:result[0].data,
            users:result[1].data
        })
        this.initRoles()
    }

    // 初始化角色信息（将roles._id 和 roles.name 整合）
    initRoles = () =>{
        // console.log(this.state.roles)
        const roleName = this.state.roles.reduce((pre,next)=>{
            pre[next._id] = next.name
            return pre
        },{})
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
        const {roles,users} = this.state
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
                    // loading={loading}      //设置数据是否在加载中
                    bordered
                    pagination={{defaultPageSize: PAGE_NUMBER}}    //配置分页器
                />
                <Modal
                    title="请添加用户"
                    visible={this.state.showAdd}
                    onOk={this.handleOkAdd}
                    onCancel={this.handleCancel}
                >
                    <AddUser setForm={(form)=>this.form=form} onfinish={this.addUser} roles={roles} />
                </Modal>
            </Card>
        );
    }
}

export default User;
