import React, {Component} from 'react';
import {Card, Select, Input, Button, Table} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import {reqProducts, reqSearchProducts} from "../../api";
import MyButton from "../../components/my-button/MyButton";
import {PAGE_NUMBER} from '../../utils/constans'
import '../user/table.less'
const {Option} = Select

class ShowProducts extends Component {

    state = {
        products: [],           // 存放所有商品列表
        total: 0,                // 商品的总数
        keywords: '',            // 搜索的关键词
        searchType: 'name',      // 存储搜索类型，默认是按商品名称搜索
    }

    //初始化每列的信息
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                align:'center'
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                align:'center'
            },
            {
                title: '商品价格',
                dataIndex: 'price',
                render: (price) => `￥${price}`,
                align:'center'
            },
            {
                title: '操作类型',
                width: 300,
                render: (product) => {
                    // console.log(product);//render函数的参数 是对应行的数据源
                    return (
                        <span>
                            <MyButton style={{marginRight:20}} onClick={()=>this.props.history.push({
                                pathname:'/admin/product/detail',
                                state:{product}
                            })}>详情</MyButton>
                            <MyButton style={{marginRight:20}} onClick={() => this.props.history.push({
                                pathname: '/admin/product/addUpdate',
                                state: {product}
                            })}>修改</MyButton>
                            <MyButton>删除</MyButton>
                        </span>
                    )
                },
                align:'center'
            }
        ];
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts(1)         // 获取第一页的商品数据
    }

    // 根据页码获取对应的分页数据
    getProducts = async (page) => {     // 获取商品数据

        const {keywords, searchType} = this.state
        let result = null;
        if (keywords) {
            result = await reqSearchProducts(page, PAGE_NUMBER, keywords, searchType)
        } else {
            result = await reqProducts(page, PAGE_NUMBER)
        }
        // const result = await reqProducts(page, PAGE_NUMBER)
        // console.log(result)
        const {status, data} = result
        if (status === 0) {
            const {result, total} = data
            this.setState({
                products: result,
                total
            })
        }
    }

    render() {
        const {products, total, keywords, searchType} = this.state
        // console.log(total)
        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{width: 200}}
                    onChange={(value) => {
                        // console.log(value)
                        this.setState({searchType: value})
                    }}
                >
                    <Option value='name'>按名称搜索</Option>
                    <Option value='desc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder={'请输入搜索关键词'}
                    style={{width: 200, margin: 10}}
                    value={keywords}
                    onChange={(e) => this.setState({keywords: e.target.value})}
                />
                <Button type={'primary'} onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/admin/product/addUpdate')}>
                <PlusOutlined/>
                <span>添加商品</span>
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        dataSource={products}  //数据源
                        columns={this.columns}       //每列的信息
                        rowKey='_id'        //必须要有的
                        // loading={loading}      //设置数据是否在加载中
                        bordered
                        rowClassName={'table'}
                        pagination={{       //配置分页器
                            total,
                            defaultPageSize: PAGE_NUMBER,
                            onChange: this.getProducts
                        }}
                    />
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
