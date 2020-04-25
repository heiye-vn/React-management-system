import React, {Component} from 'react';
import {Menu} from 'antd';
import menusConfig from '../../config/menusConfig'
import {NavLink, withRouter} from "react-router-dom";
import storageUtils from '../../utils/storageUtils'
import {reqGetRole} from "../../api";

const {SubMenu} = Menu;

class LeftNav extends Component {

    state = {
        menus: []
    }

    // UNSAFE_componentWillMount() {   // 初始化导航栏的结构 因为初始化是同步的
    //     this.menus = this.getMenus(menusConfig)
    // }

    componentDidMount() {
        this.getRoleMenus()
    }

    // 根据本地localStorage中的role_id获取对应的角色权限
    getRoleMenus = async () => {
        const {role_id, username} = storageUtils.getUser()
        this.username = username
        // console.log(this.username)
        if (role_id) {        // 如果有role_id，即不是管理员admin
            const result = await reqGetRole(role_id)
            // console.log(result)
            const {data} = result
            // 把角色的权限数据挂到实例化对象上
            this.roleAuth = data.menus
            this.setState({
                menus: this.getMenus(menusConfig)
            })
        } else {      // 如果是管理员admin
            this.setState({
                menus: this.getMenus(menusConfig)
            })
        }
    }

    // 该函数是根据角色的权限数据，来判断对用的用户是否有看到item的权限，返回值是true表示有item的权限，false表示没有
    hasAuth = (item) => {
        // console.log(this.roleAuth)
        if (this.username === 'admin' || item.public || this.roleAuth.includes(item.key)) {      // 如果权限数组中包含了item的权限
            return true
        } else if (item.children) {
            return item.children.find(cItem => this.roleAuth.includes(cItem.key))
        } else {
            return false
        }
    }

    getMenus = (menus) => {
        // console.log(menus)
        const {pathname} = this.props.location
        return menus.map(item => {
            // console.log(item)
            // 先判断登录的用户有没有对应的权限
            if (this.hasAuth(item)) {
                if (item.children) {    // 如果是可收缩的选项
                    // 从所有子菜单中寻找初始打开的一级菜单
                    // /admin/category ==> /admin/category

                    const result = item.children.filter(cItem => {
                        return pathname === cItem.key
                    })
                    if (result.length) {  // 如果在有children的数组中找到了匹配 pathname 的key值
                        this.defaultOpenKeys = item.key
                    }

                    return <SubMenu
                        key={item.key}
                        title={<span>{item.icon}<span>{item.title}</span></span>}
                    >
                        {this.getMenus(item.children)}
                    </SubMenu>
                } else {  // 如果是不可收缩的选项
                    return <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            {item.icon}
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                }
            }
        })
    }

    render() {
        // console.log(menusConfig)
        // console.log(this.props);

        const {pathname} = this.props.location

        return (
            <div>
                <Menu
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={[this.defaultOpenKeys]}
                    mode="inline"
                    theme="dark"
                >
                    {/*<Menu.Item key="1">
                        <HomeOutlined/>
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
               <AppstoreOutlined/>
                <span>商品</span>
              </span>
                        }
                    >
                        <Menu.Item key="5">
                            <MenuUnfoldOutlined/>
                            分类管理
                        </Menu.Item>
                        <Menu.Item key="6">
                            <ToolOutlined />
                            商品管理
                        </Menu.Item>
                    </SubMenu>*/}

                    {
                        this.state.menus
                    }
                </Menu>
            </div>
        );
    }
}

// 如何让非路由组件拥有路由组件的三个特性：history，location，match，使用react-router-dom中的 withRouter 包
export default withRouter(LeftNav)

