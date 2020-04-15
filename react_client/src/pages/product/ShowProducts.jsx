import React, {Component} from 'react';
import {Card,Select,Input,Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import {reqProducts} from "../../api";

const {Option} = Select

class ShowProducts extends Component {

    componentDidMount() {
        this.getProducts(1)         // 获取第一页的商品数据
    }

    getProducts = async (page)=>{     // 获取商品数据
        const result = await reqProducts(page,3)
        console.log(result)
    }

    render() {
        const title = (
            <span>
                <Select value={'1'} style={{width:200}}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder={'请输入搜索关键词'} style={{width:200,margin:10}}/>
                <Button type={'primary'}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={()=>this.props.history.push('/admin/product/addUpdate')}>
                <PlusOutlined/>
                <span>添加商品</span>
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    ShowProducts
                </Card>
            </div>
        );
    }
}

/*
        前台分页
            1.只有一次网络请求  在本次请求中从后台获取所有的数据
            2.每次点击分页按钮时，不会发起网络请求

        后台分页
            1.有多次网络请求，每次网络请求的是从后台获取定量的数据（根据当前页可展示的数据数量来决定）
            2.每次点击分页按钮时，都会发起网络请求
            3.每次网络请求需要给后台传递当前的页码（page）和请求的数据量（number）


* */

export default ShowProducts;
