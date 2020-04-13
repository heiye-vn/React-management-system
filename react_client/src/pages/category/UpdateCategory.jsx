import React, {Component} from 'react';
import {Form,Input} from 'antd'


export default class UpdateCategory extends Component {

    formRef = React.createRef()

    componentDidMount(){        // 注：在UNSAFE_componentWillMount钩子函数中获取不到form实例
        const form = this.formRef.current     // 类组件获取 form 实例对象
        //console.log(form)
        this.props.setForm(form)           //把子组件的form对象传递给 父组件
        //console.log(this.props)
    }


    render() {
        const {categoryName} = this.props
        return (
            <Form
                onFinish={this.props.onfinish}
                initialValues={{parentId: categoryName}}
                ref={this.formRef}>
                 <Form.Item
                    name='categoryName'
                    rules={[
                            {required: true, message: "用户名不能为空"}
                    ]}>
                    <Input placeholder='请输入分类名称'></Input>
                 </Form.Item>
            </Form>
        );
    }
}
