import React, { Component } from 'react'

import {Redirect} from 'react-router-dom'
import storageUtils from "../../utils/storageUtils";

export default class Admin extends Component {
    // 如果人为在地址栏输入 /admin ，是不会跳转到 admin 组件的

    // 解决方案：登录成功时把用户信息存储到本地，一旦加载 admin 组件时就读取本地的用户信息，如果没有本地用户信息，则路由重定向到 /login ，如果有用户信息，则加载 admin 组件
    render() {
        console.log(storageUtils.getUser())
        const user = storageUtils.getUser()
        if(!user._id){
            return <Redirect to={'/login'}/>
        }
        return (
            <div>
                Admin 组件
            </div>
        )
    }
}
