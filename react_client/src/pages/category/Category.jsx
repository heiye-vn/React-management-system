import React, {Component} from 'react';
import {Button, Card, message, Modal, Table} from 'antd';
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';
import AddCategory from "./AddCategory";
import UpdateCategory from './UpdateCategory'
import MyButton from "../../components/my-button/MyButton";
// import AddCategory1 from "./AddCategory";
import {reqAddCategory, reqGetCategorys, reqUpdateCategory} from '../../api/index'

export default class Category extends Component {
    state = {
        showAdd: false,//表示添加分类的界面 默认不显示
        showUpdate: false,   //添加修改的界面 默认不显示
        categorys: [],    //存放所有的一级分类
        loading: true,   //记录组件的数据是否正在加载中
        parentId: '0',   //记录是Table组件显示的是一级分类的数据 还是二级分类的数据
        subCategorys: [],//存放所有的二级分类
        parentName: '',  //记录点击查看子分类的父分类
    }

    columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            width: 300,
            render: (category) => {
                // console.log(a);//render函数的参数 是对应行的数据源
                return (
                    <span>
                            <MyButton onClick={() => this.showUpdate(category)}>修改分类名</MyButton>
                        {
                            this.state.parentId === '0' ?
                                <MyButton onClick={() => this.showSubCategory(category)}>查看子分类</MyButton> : null
                        }

                        </span>
                )
            }
        }
    ];


    //点击查看子分类按钮  显示二级分类
    showSubCategory = (category) => {
        // console.log(category)
        this.setState({ //把组件的parentId 改成电脑的id值  setState函数是异步的
            parentId: category._id,
            parentName: category.name
        }, () => { //修改好parentId之后 再执行函数
            this.getCategorys()
        })

    }

    //显示一级分类集合
    showCategorys = () => {
        this.setState({ //  重置parentId 和parentName
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }


    componentDidMount() {
        this.getCategorys()
    }

    // 展示添加分类的界面
    showAdd = () => {
        this.setState({showAdd: true})
    }

    //展示修改分类的页面
    showUpdate = (category) => {
        this.category = category
        // console.log('showUpdate')
        this.setState({showUpdate: true})
    }

    //点击修改分类页面的ok按钮
    handleUpdateOk = () =>{
        this.form.submit()
    }
    updateCategory = async (values) => {
        if (values) {
            // console.log(err,values)
            // console.log(this.category)
            values._id = this.category._id
            const result = await reqUpdateCategory(values)
            console.log(result)

            const {status, msg} = result
            if (status === 0) { //如果添加分类成功  从数据库中获取所有的分类  展示在页面中
                message.success(msg)
                this.form.resetFields()
                this.setState({showUpdate: false});
                this.getCategorys()

            } else {
                message.error(msg)
            }
        }
    }


    //获取所有的一级分类
    getCategorys = async (parentId) => {
        //加载数据
        this.setState({loading: true})
        // const {parentId} = this.state
        parentId = parentId || this.state.parentId
        const result = await reqGetCategorys(parentId)
        //数据加载完成
        this.setState({loading: false})
        const {status, msg, data} = result
        if (status === 0) { //如果获取分类成功
            // message.success(msg)
            if (parentId === '0') { //如果是要显示一级分类集合
                this.setState({categorys: data})
            } else {  //如果是要显示某个一级分类下的 二级分类集合
                this.setState({subCategorys: data})
            }
        } else {
            message.error(msg)
        }
    }

    //点击添加分类页面的点击ok按钮  需要得到添加的分类数据
    handleAddOk = () => {
        this.form.submit()
    }
    addCategory = async (values) => {
        // console.log('ok')
        if (values) {   //如果通过了前台验证  就向后台发起请求 把分类数据添加到数据库
            const result = await reqAddCategory(values);// parentId:0  categoryName:男士内衣
            const {status, msg} = result
            if (status === 0) { //如果添加分类成功  从数据库中获取所有的分类  展示在页面中
                message.success(msg)
                this.form.resetFields()
                this.setState({showAdd: false});

                //在显示二级分类面板中 添加新的一级分类
                if (values.parentId === this.state.parentId) {  //如果下拉框收集的parentId和组件的parentId相等
                    this.getCategorys()
                } else if (values.parentId === '0') { //如果下拉框收集的parentId 是 '0' 表示新增一个一级分类
                    this.getCategorys('0')
                }

            } else {
                message.error(msg)
            }
        }
    };

    //点击cancel按钮  叉号  模态框之外的区域
    handleCancel = e => {
        // console.log('cancel')
        //清空输入框的数据
        this.form.resetFields()
        this.setState({
            showAdd: false,
            showUpdate: false,
        });
    };

    render() {
        const {categorys, loading, subCategorys, parentId, parentName} = this.state

        this.category = this.category || {}
        const categoryName = this.category.name

        const title = parentId === '0' ? '一级分类' : (
            <span>
                <MyButton onClick={this.showCategorys}>一级分类</MyButton>
                <ArrowRightOutlined/>
                {parentName}
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined/>
                <span>添加分类</span>
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={parentId === '0' ? categorys : subCategorys}  //数据源
                    columns={this.columns}       //每列的信息
                    rowKey='_id'        //必须要有的
                    loading={loading}      //设置数据是否在加载中
                    bordered
                    pagination={{defaultPageSize: 4}}    //配置分页器
                />
                <Modal
                    title="请添加分类"
                    visible={this.state.showAdd}
                    onOk={this.handleAddOk}
                    onCancel={this.handleCancel}
                >
                    <AddCategory
                        categorys={categorys}
                        parentId={parentId}
                        setForm={(form) => this.form = form}
                        onfinish={this.addCategory}
                    />
                </Modal>

                <Modal
                    title="请修改分类"
                    visible={this.state.showUpdate}
                    onOk={this.handleUpdateOk}
                    onCancel={this.handleCancel}
                >
                    <UpdateCategory
                        categoryName={categoryName}
                        setForm={(form) => this.form = form}
                        onfinish={this.updateCategory}
                    />
                </Modal>

            </Card>
        );
    }
}
