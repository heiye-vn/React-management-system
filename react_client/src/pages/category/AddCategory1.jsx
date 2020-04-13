import React,from 'react';
import {Form, Select, Input} from 'antd';

const {Option} = Select;

// 使用函数组件获取Form表单值
export default function AddCategory1(props) {

    const [form] = Form.useForm()

    React.useEffect(() => {
        props.setForm(form)
        // console.log(props)

    })

    return (
        <div>
            <Form
                initialValues={{parentId: '0'}}
                form={form}
                oFinish={props.onfinish}
            >
                <Form.Item name="parentId">
                    <Select>
                        <Option value="0">一级分类</Option>
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
    );
}
