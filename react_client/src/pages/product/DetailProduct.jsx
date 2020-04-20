import React, {Component} from 'react';
import MyButton from "../../components/my-button/MyButton";
import {Card, List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import './DetailProduct.less'
import {BASE_URL} from "../../utils/constans";
import {reqCategoryInfo} from '../../api'
const {Item} = List

class DetailProduct extends Component {
    state = {
        name1:'',
        name2:''
    }
    componentDidMount(){
        this.getCategory()
    }

    getCategory = async ()=>{
        const {categoryId,pCategoryId} = this.props.location.state.product
        // const result1 = await reqCategoryInfo(pCategoryId)
        // const result2 = await reqCategoryInfo(categoryId)

        // console.log(categoryId,pCategoryId)
        // 如果是一级分类下的商品
        if(pCategoryId==='0'){
            const result = await  reqCategoryInfo(categoryId)
            this.setState({
                name1:result.data.name
            })
        }else{
            const result = await Promise.all([reqCategoryInfo(pCategoryId),reqCategoryInfo(categoryId)])
            this.setState({
                name1:result[0].data.name,
                name2:result[1].data.name,
            })
        }
    }
    render() {
        const title = (
            <span>
                <MyButton onClick={this.props.history.goBack}>
                    <ArrowLeftOutlined/>
                </MyButton>
                <span>商品详情</span>
            </span>
        )
        // console.log(this.props.location.state.product)
        const { desc, details, imgs, name, price} = this.props.location.state.product
        const {name1,name2} = this.state
        // console.log( desc, details, imgs, name, price)
        return (
            <Card title={title}>
                <List
                    bordered
                    size={"large"}
                >
                    <Item>
                        <span className='left'>
                            商品名称：
                            <span className='right'>{name}</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品描述：
                            <span className='right'>{desc}</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品价格：
                             <span className='right'>{price}元</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品分类：
                            <span className='right'>
                                {name2?name1+'-->'+name2:name1}
                            </span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品图片：
                            <span className='right'>
                            {
                                imgs.map((item, index) => <img
                                    key={index}
                                    className='product-img'
                                    src={BASE_URL + item}
                                    alt=""/>)
                            }
                        </span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品详情：
                            <span className={'detail'} dangerouslySetInnerHTML={{__html: details}}/>
                        </span>

                    </Item>
                </List>
            </Card>
        );
    }
}

export default DetailProduct;
