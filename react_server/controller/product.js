const fs = require('fs')
const path = require('path')

const Products = require('../schema/product') // 引入商品模型

// 上传图片
exports.uploadImg = async (cxt) => {
    const {
        filename
    } = cxt.req.file
    cxt.body = { // 图片上传成功后返回给前台的数据
        status: 0,
        msg: '图片上传成功',
        data: {
            name: filename,
            url: `http://localhost:5000/uploads/${filename}`
        },
    }
}

// 删除图片
exports.deleteImg = async (cxt) => {

    const {
        name
    } = cxt.request.body

    const filename = path.join(__dirname, '../public/uploads', name)
    fs.unlinkSync(filename)
    cxt.body = { // 图片删除后返回给前台的信息
        status: 0,
        msg: '图片删除成功'
    }

}

// 添加商品
exports.addProduct = async cxt=>{
    const {name} = cxt.request.body
    const result = await Products.findOne({name})
    if(result){   //如果找到了 就提示商品名称重复
        cxt.body = {
            status: 1,
            msg: '该商品名称重复'
        }
    } else {      //如果没有找到该商品 就添加该商品
        const product = await Products.create(cxt.request.body)
        cxt.body = {
            status: 0,
            data: product,
            msg: '添加商品成功',
        }
    }

}