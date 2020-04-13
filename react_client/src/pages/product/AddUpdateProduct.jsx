import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Button} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';

import MyButton from "../../components/my-button/MyButton";
import {reqGetCategorys} from '../../api/index'
import UploadPic from "./UploadPic";

const {TextArea} = Input;

class AddUpdateProduct extends Component {

    state = {
        options: [],      // 存放所有分类选项
    };

    formRef = React.createRef()

    componentDidMount() {
        // const form = this.formRef.current
        this.getCategorys()
    }

    getCategorys = async () => {
        const result = await reqGetCategorys('0')
        const {status, data} = result
        // console.log(data);

        // const options = data.map(item => ({
        //     value: item._id,
        //     lable: item.name,
        //     isLeaf: false,
        // }))

        const options = this.formatoData(data, true)

        if (status === 0) { //如果获取分类成功
            this.setState({options})
        }
    }

    //把数据转换成cascader组件需要的数据格式
    formatoData = (data, bool) => {
        return data.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: bool ? false : true,        // 当 bool为true时，表示该分类不是叶子，bool为false时表示该分类是叶子
        }))
    }

    // 点击第一级选项时触发 selectedOptions 是对应的点击项
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0]
        // console.log(targetOption)
        // 加载第二级选项，true表示正在加载
        targetOption.loading = true
        // 根据value值去查找某个分类下的子分类
        const result = await reqGetCategorys(targetOption.value)
        // console.log(result)
        // 加载子分类完成，false表示加载完成
        targetOption.loading = false
        let {status, data} = result
        // 判断，如果获取到了子分类，就渲染，并且该分类的子分类的isLeaf值为true，如果没有获取到子分类，则该分类的isLeaf值为true
        if (status === 0) {
            targetOption.children = this.formatoData(data, false)
        } else {
            targetOption.isLeaf = true
        }
        // 更新数据
        this.setState({
            options: [...this.state.options]
        })
    }

    // 收集表单数据
    onFinish = (values)=>{
        console.log(values)
    }

    render() {
        const title = (
            <span>
                <MyButton onClick={this.props.history.goBack}>
                    <ArrowLeftOutlined/>
                </MyButton>
                <span>添加商品页面</span>
            </span>
        )

        const formItemLayout = {
            labelCol: {             // 文字占据的比例（一共为24份）
                sm: {span: 5,},
            },
            wrapperCol: {           // 标签组件占据的比例（一共为24份）
                sm: {span: 8,},
            },
        };

        return (
            <Card title={title}>
                <Form
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish}>
                    <Form.Item
                        label="商品名称"
                        name='productName'
                        rules={[
                            {required: true, message: "商品名称不能为空"}
                        ]}
                    >
                        <Input placeholder={'请输入商品名称'}/>
                    </Form.Item>
                    <Form.Item
                        label="商品描述"
                        name='productDescription'
                        rules={[
                            {required: true, message: "商品描述不能为空"}
                        ]}
                    >
                        <TextArea placeholder={'请输入商品描述'}/>
                    </Form.Item>
                    <Form.Item
                        label="商品价格"
                        name='productPrice'
                        rules={[
                            {required: true, message: "商品价格不能为空"}
                        ]}
                    >
                        <Input type={'number'} min={'0'} placeholder={'请输入商品价格'} addonAfter={'￥'}/>
                    </Form.Item>
                    <Form.Item
                        label="商品分类"
                        name='productCategory'
                        rules={[
                            {required: true, message: "商品分类不能为空"}
                        ]}
                    >
                        <Cascader       // 收集到的数据是 options 的 value值
                            options={this.state.options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            placeholder={'请选择分类'}
                            changeOnSelect
                        />
                    </Form.Item>
                    <Form.Item
                        label="商品图片"
                        name='productImg'
                        rules={[
                            {required: true, message: "商品分类不能为空"}
                        ]}
                    >
                    <UploadPic />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default AddUpdateProduct;
