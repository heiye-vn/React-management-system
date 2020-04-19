import React, {Component} from 'react';
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {reqDelteImg} from '../../api/index'
import {BASE_URL} from "../../utils/constans";

class UploadPic extends Component {
    constructor(props) {
        super(props);
        // console.log(props.imgs)
        const {imgs} = this.props       //如果是添加页面，imgs的值就为undefined，如果是修改页面，imgs的值就为一个数组

        let fileList = [];
        if (imgs) {
            fileList = imgs.map((item, index) => ({
                uid: -index,
                name: item,
                status: 'done',
                url: BASE_URL+item
            }))
        }
        this.state = {
            previewVisible: false,      // 是否在预览图片，true表示正预览，false表示没有预览
            previewImage: '',           // 预览图片的路径
            fileList                    // upload组件上传的图片
        }
    }

    // state = {
    //     previewVisible: false,      // 是否在预览图片，true表示正预览，false表示没有预览
    //     previewImage: '',           // 预览图片的路径
    //     fileList: [],               // upload组件上传的图片
    // };

    // 根据fileList生成图片名字组成的数组
    getImgs = () => this.state.fileList.map(item => item.name)

    handleCancel = () => {
        // console.log('关闭了图片预览')
        this.setState({previewVisible: false})
    };

    handlePreview = async file => {
        // console.log('预览图片', file)
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    // 在一定时间间隔里监听图片的上传进度 如果file对象的status值为uploading表示正在上传，值为done表示上传完成 removed 表示图片删除了
    handleChange = async ({file, fileList}) => {

        // console.log(fileList)
        // console.log(file)

        // 上传图片后，给本次上传的图片修改name属性以及添加url属性
        // console.log('上传的文件状态发生改变了',file)
        this.setState({fileList})

        if (file.status === 'done') {         // 如果图片上传完成
            // console.log(file.response);
            file = fileList[fileList.length - 1]    // 因为当前的 file 只是本地的file对象，而fileList才是真正的 file 对象
            const {msg, data} = file.response
            message.success(msg)            // 提示图片上传完成

            file.name = data.name
            file.url = data.url

        } else if (file.status === 'removed') {    // 如果前台删除了图片就请求后台也删除对应的图片
            const result = await reqDelteImg(file.name)
            const {msg} = result
            message.success(msg)
        }
    };

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/img/upload"         // 图片提交的地址
                    listType="picture-card"     // 图片列表的样式
                    fileList={fileList}
                    name={'image'}
                    accept={'image/*'}             // 接收上传文件的类型（表示接收所有类型的图片）
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {
                        // 控制上传图片的数量
                        fileList.length >= 3 ? null : uploadButton
                    }
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

export default UploadPic;
