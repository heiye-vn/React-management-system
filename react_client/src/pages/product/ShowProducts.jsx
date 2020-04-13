import React, {Component} from 'react';
import {Card,Select,Input,Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons';

const {Option} = Select

class ShowProducts extends Component {
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

                </Card>
                showProducts
            </div>
        );
    }
}

export default ShowProducts;
