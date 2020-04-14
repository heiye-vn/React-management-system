import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Button, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';

import MyButton from "../../components/my-button/MyButton";
import {reqGetCategorys, reqAddProduct} from '../../api/index'
import UploadPic from "./UploadPic";
import RichTextEditor from "./RichTextEditor";

const {TextArea} = Input;

class AddUpdateProduct extends Component {

    constructor(props) {
        super(props);
        this.imgs = React.createRef()       // 创建标记对象
        this.details = React.createRef()
    }

    state = {
        options: [],      // 存放所有分类选项
    };

    componentDidMount() {
        this.getCategorys()
    }

    getCategorys = async () => {
        const result = await reqGetCategorys('0')
        const {status, data} = result
        // console.log(data);

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
    onFinish = async (values) => {
        // 父组件如何调用子组件的方法
        const imgs = this.imgs.current.getImgs()
        const details = this.details.current.getDetails()
        console.log(values, imgs, details)

        const {name, desc, price, category} = values
        let pCategoryId, categoryId
        if (category.length === 1) {        // 如果收集的是长度为1的数组
            pCategoryId = '0'
            categoryId = category[0]
        } else {
            pCategoryId = category[0]
            categoryId = category[1]
        }

        const porductInfo = {name, desc, price, pCategoryId, categoryId, imgs, details}
        const result = await reqAddProduct(porductInfo)
        console.log(result);
        const {status,msg} = result
            if(status === 0){   // 如果添加商品成功，则提示成功，并且跳转到 /admin/product 页面
                message.success(msg)
                this.props.history.push('/admin/product')
            }else{
                message.error(msg)
            }

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
                sm: {span: 6,},
            },
            wrapperCol: {           // 标签组件占据的比例（一共为24份）
                sm: {span: 12,},
            },
        };

        return (
            <Card title={title}>
                <Form
                    {...formItemLayout}
                    onFinish={this.onFinish}>
                    <Form.Item
                        label="商品名称"
                        name='name'
                        rules={[
                            {required: true, message: "商品名称不能为空"}
                        ]}
                    >
                        <Input placeholder={'请输入商品名称'}/>
                    </Form.Item>
                    <Form.Item
                        label="商品描述"
                        name='desc'
                        rules={[
                            {required: true, message: "商品描述不能为空"}
                        ]}
                    >
                        <TextArea placeholder={'请输入商品描述'}/>
                    </Form.Item>
                    <Form.Item
                        label="商品价格"
                        name='price'
                        rules={[
                            {required: true, message: "商品价格不能为空"}
                        ]}
                    >
                        <Input type={'number'} min={'0'} placeholder={'请输入商品价格'} addonAfter={'￥'}/>
                    </Form.Item>
                    <Form.Item
                        label="商品分类"
                        name='category'
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
                    <Form.Item label="商品图片">
                        <UploadPic ref={this.imgs}/>
                    </Form.Item>
                    <Form.Item label="商品详细描述">
                        <RichTextEditor ref={this.details}/>
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
