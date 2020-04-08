import React, {Component} from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'
import {Layout} from 'antd';
import storageUtils from "../../utils/storageUtils";
// 注：所有 import 的文件必须放在整个文件的最前面，否则会报错
import LeftNav from "../../components/left-nav/LeftNav";
import Home from '../home/Home'
import Category from "../category/Category";
import Product from "../product/Product";
import User from "../user/User";
import Role from "../role/Role";
import Bar from "../charts/Bar";
import Line from "../charts/Line";
import Pie from "../charts/Pie";
import Header from "../../components/header/Header";

const { Footer, Sider, Content} = Layout;

export default class Admin extends Component {
    // 如果人为在地址栏输入 /admin ，是不会跳转到 admin 组件的

    // 解决方案：登录成功时把用户信息存储到本地，一旦加载 admin 组件时就读取本地的用户信息，如果没有本地用户信息，则路由重定向到 /login ，如果有用户信息，则加载 admin 组件
    render() {
        // console.log(storageUtils.getUser())
        const user = storageUtils.getUser()
        if (!user._id) {
            return <Redirect to={'/login'}/>
        }

        return (
            <Layout style={{height: "100%"}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                   <Header />
                    <Content>
                        <Switch>
                            <Route path='/admin/home' component={Home}/>
                            <Route path='/admin/category' component={Category}/>
                            <Route path='/admin/product' component={Product}/>
                            <Route path='/admin/user' component={User}/>
                            <Route path='/admin/role' component={Role}/>
                            <Route path='/admin/charts/bar' component={Bar}/>
                            <Route path='/admin/charts/line' component={Line}/>
                            <Route path='/admin/charts/pie' component={Pie}/>
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
