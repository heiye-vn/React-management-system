import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import AddUpdateProduct from "./AddUpdateProduct";
import ShowProducts from "./ShowProducts";
import DetailProduct from "./DetailProduct";

/*
*      当路径为 /admin/product/addUpdate 时，展示添加商品页面
*
*      当路径为 /admin/product/ 时，展示所有商品页面
*
*      当路径为 /admin/product/addUpdate 时，修改商品页面
*
*      当路径为 /admin/product/detail 时，展示某个商品的详情页
* */

class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/admin/product/addUpdate' component={AddUpdateProduct}></Route>
                    <Route exact path='/admin/product' component={ShowProducts}></Route>
                    <Route path='/admin/product/detail' component={DetailProduct}></Route>
                </Switch>
            </div>
        );
    }
}

export default Product;
