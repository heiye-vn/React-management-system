import React, {Component} from 'react';
import {
    Button,
    Card,
    Modal,
} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import AddCategory from "./AddCategory";

class Category extends Component {

    state = {
        visible: false       // 添加分类模态框默认不显示
    }

    showAdd = () => {
        this.setState({visible: true})
    }

    onFinish = (values)=>{
       console.log(values)
    }

    handleOk = () => {   // 需要得到添加分类的数据

        // console.log(this.form)
        this.form.submit()

        this.setState({
            visible: false,
        });
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
        const {visible} = this.state
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Modal
                        title="请添加分类"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <AddCategory
                            setForm={(form)=>this.form=form}
                            onfinish={this.onFinish}
                        />
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default Category;
