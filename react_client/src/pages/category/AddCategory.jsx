import React, {Component} from 'react';
import {Form, Select, Input} from 'antd';


const {Option} = Select;

// 使用类组件获取 Form表单数据
export default class AddCategory extends Component {

    formRef = React.createRef()

    componentDidMount() {
        // console.log(this.props)
        const form = this.formRef.current
        this.props.setForm(form)
    }
    render() {
        const {categorys,parentId} = this.props
        return (
            <div>
                <Form
                    initialValues={{parentId: parentId}}
                    ref={this.formRef}
                    onFinish={this.props.onfinish}
                >
                    <Form.Item name="parentId">
                        <Select>
                            <Option value="0">一级分类</Option>
                            {
                                categorys.map(item=>{
                                    return <Option
                                        key={item._id}
                                        value={item._id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='categoryName'
                        rules={[
                            {required: true, message: "用户名不能为空"}
                        ]}

                    >
                        <Input placeholder='请输入分类名称'></Input>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


