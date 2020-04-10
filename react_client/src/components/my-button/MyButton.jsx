import React, {Component} from 'react';

import './MyButton.less'
class MyButton extends Component {
    render() {
        return (
            // 使用 ...（扩展运算符）的好处是：无论父组件传什么值过来，子组件都可以接收并使用对应的值
            <button {...this.props}  className='my-button'></button>
        );
    }
}

export default MyButton;
