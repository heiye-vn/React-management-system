import React, {Component} from 'react';
import {Menu} from 'antd';
import menusConfig from '../../config/menusConfig'
import {NavLink, withRouter} from "react-router-dom";

const {SubMenu} = Menu;

class LeftNav extends Component {

    UNSAFE_componentWillMount() {   // 初始化导航栏的结构 因为初始化是同步的
        this.menus = this.getMenus(menusConfig)
    }

    getMenus = (menus) => {
        // console.log(menus)
        const {pathname}  = this.props.location
        return menus.map(item => {
            // console.log(item)
            if (item.children) {    // 如果是可收缩的选项
                // 从所有子菜单中寻找初始打开的一级菜单
                // /admin/category ==> /admin/category

                const result = item.children.filter(cItem=>{
                    return pathname === cItem.key
                })
                if(result.length){  // 如果在有children的数组中找到了匹配 pathname 的key值
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
        })
    }

    render() {
        // console.log(menusConfig)
        // console.log(this.props);

        const {pathname}  = this.props.location

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
                       this.menus
                    }
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftNav)
// 如何让非路由组件拥有路由组件的三个特性：history，location，match
