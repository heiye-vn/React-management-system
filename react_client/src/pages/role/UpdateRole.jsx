import React, {Component} from 'react';
import {Tree, Form, Input} from 'antd';
import menusConfig from "../../config/menusConfig";

const {Item} = Form;
export default class UpdateRole extends Component {

    state = {
        checkedKeys:this.props.role.menus,        // 存放角色的权限信息
    }

    UNSAFE_componentWillMount() {   // 初始化导航栏的结构 因为初始化是同步的
        this.treeData = this.getTreeNodes(menusConfig)
    }

    // 当组件接收的属性变化时，更改state中的checkedKeys的值
    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        const {menus} = nextProps.role
        this.setState({checkedKeys:menus})
    }

    getTreeNodes = (menusConfig) =>{
        return menusConfig.reduce((pre,next)=>{
            if(next.children){
                pre.push({
                    title:next.title,
                    key:next.key,
                    children:this.getTreeNodes(next.children)
                })
            }else {
                pre.push({
                    title:next.title,
                    key:next.key
                })
            }
            return pre
        },[])
    }

    onCheck = (checkedKeys) =>{
        // console.log(checkedKeys)
        // checkedKeys 设置复选框是否选中  selectedKeys 设置文字是否选中
        this.setState({checkedKeys})
    }

    render() {
        const {role} = this.props
        return (
            <Form>
                <Item label={'角色名称'}>
                    <Input value={role.name} disabled={true}/>
                </Item>
                <Item>
                    <Tree
                        checkable
                        defaultExpandAll={true}
                        treeData={this.treeData}
                        checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck}
                    />
                </Item>
            </Form>
        );
    }
}
