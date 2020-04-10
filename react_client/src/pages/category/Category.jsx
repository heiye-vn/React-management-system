import React, {Component} from 'react';
import {Button, Card, message, Modal,Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import AddCategory from "./AddCategory";
import MyButton from "../../components/my-button/MyButton";
// import AddCategory1 from "./AddCategory";
import {reqAddCategory, reqgetCategorys} from '../../api/index'

class Category extends Component {

    state = {
        visible: false,       // 添加分类模态框默认不显示
        categorys:[],       // 存放所有一级分类
        loading:false,       // 记录组件的数据是否正在加载中
    }

   UNSAFE_componentWillMount() {
        this.initColumns()
   }

    // 初始化每列的信息
    initColumns = () =>{
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width:300,
                render:(a,b)=>{
                    // console.log(a)     // render函数的参数，是对应数据源
                    return (
                        <span>
                    <MyButton onClick={this.updateCategory}>修改分类名</MyButton>
                    <MyButton>查看子分类</MyButton>
                </span>
                    )
                }
            }
        ];
    }

    componentDidMount() {
        this.getCategory()
    }

    //
    updateCategory = () =>{
        console.log('函数执行');
    }

    showAdd = () => {
        this.setState({visible: true})
    }

    // 获取所有一级分类
    getCategory = async () =>{
        this.setState({loading:true})       // 数据加载中
        const result = await reqgetCategorys('0')
        // console.log(result);
        this.setState({loading:false})      // 数据加载完成
        const {status,data,msg} = result
        if(status === 0){
            // message.success(msg)
            this.setState({categorys:data})
        }else{
            message.error(msg)
        }
    }

    onFinish = async (values) => {
        console.log(values);
        if (values) {             // 如果通过前台验证，就向后台发起请求，把分类数据保存到数据库中
            const result = await reqAddCategory(values)
            // console.log(result)

            const {status, data, msg} = result
            if (status === 0) {       // 如果添加分类成功，然后把数据库中的数据渲染到页面
                message.success(msg)
                this.setState({visible: false});
                this.getCategory()
            } else {
                message.error(msg)
                this.setState({visible: true});
            }
        }
    }

    handleOk = () => {   // 需要得到添加分类的数据
        this.form.submit()
    };

    handleCancel = () => {
        console.log("cancel");
        this.setState({
            visible: false,
        });
    };

    render() {
        const title = '一级分类'
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined/>
                <span>添加分类</span>
            </Button>
        )
        const {visible,categorys,loading} = this.state
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        dataSource={categorys}              // 数据源
                        columns={this.columns}                   // 每列的信息
                        rowKey='_id'                        // 类似 key 值（必须有）
                        loading={loading}                   // 设置数据是否在加载中
                        pagination={{defaultPageSize:4}}    // 配置分页器
                    />;
                    <Modal
                        title="请添加分类"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <AddCategory
                            setForm={(form) => this.form = form}
                            onfinish={this.onFinish}
                        />
                        {/*<AddCategory1
                            setForm={(form) => this.form = form}
                            onfinish={this.onFinish}
                        />*/}
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default Category;
