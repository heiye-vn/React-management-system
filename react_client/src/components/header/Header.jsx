import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './Header.less'
import storageUrils from '../../utils/storageUtils'
import {Modal, Button} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {reqWeather} from '../../api/index'
import menusConfig from '../../config/menusConfig'

const {confirm} = Modal;


class Header extends Component {

    state = {
        city: '成都',
        currentTime: new Date().toLocaleString(),
        weatherInfo: {}  // 存储天气信息
    }

    UNSAFE_componentWillMount() {
        this.user = storageUrils.getUser()
    }

    componentDidMount() {
        this.getCurrentTime()
        this.getWeather()
        this.getTitle()
    }

    getTitle = () => {      // 获取 header组件的标题

        const {pathname} = this.props.location

        let title = '';
        menusConfig.forEach(item => {
            if (pathname === item.key) { // 如果路径名和一级菜单中的路径名相等
                title = item.title
            }
            if (item.children) {    // 如果存在子菜单，就在子菜单中找到 pathname 和 key 相等的项
                const result = item.children.find(cItem => pathname === cItem.key)
                if (result) {
                    title = result.title
                }
            }
        })
        return title
    }

    getWeather = async () => {
        const result = await reqWeather(this.state.city)
        // console.log(result);
        this.setState({weatherInfo: result})
    }

    getCurrentTime = () => {
        setInterval(() => {
            this.setState({currentTime: new Date().toLocaleString()})
        }, 1000)
    }

    // 用户是否退出登录
    loginOut = () => {
        confirm({
            title: '确定退出么?',
            icon: <ExclamationCircleOutlined/>,
            onOk: () => {     // 使用箭头函数得到Header实例化的this
                // console.log('OK');
                // console.log(this)
                this.props.history.push('/login')
                // 删除本地用户信息
                storageUrils.removeUser()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        // console.log(this.user)
        // console.log(this.state.currentTime)
        const {city, currentTime, weatherInfo} = this.state
        const {dayPictureUrl, weather, wind, temperature} = weatherInfo

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，<span style={{fontWeight:"bold",color:"red"}}>{this.user.username}</span></span>
                    <Button onClick={this.loginOut}>退出</Button>
                </div>
                <div className='header-bottom'>
                    <span className='header-bottom-left'>{this.getTitle()}</span>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <span>{city}</span>
                        <img src={dayPictureUrl} alt=''/>
                        <span>{weather}</span>
                        <span>{temperature}</span>
                        <span>{wind}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
