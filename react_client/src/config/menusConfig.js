import React from 'react'
import {HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined} from '@ant-design/icons';
export default [
    {
        title:'首页',  // 菜单标题名称
        key:'/admin/home',  // 对应的path
        icon:<HomeOutlined/>,    // 图标名称
    },
    {
        title:'商品',
        key:'/admin/products',
        icon:<AppstoreOutlined/>,
        children:[      // 子菜单列表
            {
                title:'分类管理',
                key:'/admin/category',
                icon:<BarsOutlined/>
            },
            {
                title:'商品管理',
                key:'/admin/product',
                icon:<ToolOutlined/>
            }
        ]
    },
    {
        title:'用户管理',
        key:'/admin/user',
        icon:<UserOutlined />
    },
    {
        title:'角色管理',
        key:'/admin/role',
        icon:<SafetyOutlined />
    },
    {
        title: '图形图表',
        key: '/admin/charts',
        icon: <AreaChartOutlined />,
        children: [
            {
                title: '柱形图',
                key: '/admin/charts/bar',
                icon: <BarChartOutlined />
            },
            {
                title: '折线图',
                key: '/admin/charts/line',
                icon: <LineChartOutlined />
            },
            {
                title: '饼图',
                key: '/admin/charts/pie',
                icon: <PieChartOutlined />
            },
        ]
    }
]
