const fs = require('fs')
const path = require('path')

//引入商品模型
const Products = require('../schema/productSchema')
//上传图片
exports.uploadImg = async cxt => {
    // console.log(cxt.req.file)  
    const {
        filename
    } = cxt.req.file
    cxt.body = { //图片上传后台成功
        status: 0,
        msg: '图片上传后台成功',
        data: {
            name: filename,
            url: `http://localhost:5000/uploads/${filename}`
        }
    }
}

//删除图片
exports.deleteImg = async cxt => {
    const {
        name
    } = cxt.request.body
    const filename = path.join(__dirname, '../public/uploads', name)
    fs.unlinkSync(filename)
    cxt.body = { //图片上传后台成功
        status: 0,
        msg: '图片删除成功',
    }
}

//添加商品
exports.addProduct = async cxt => {
    // console.log(cxt.request.body)
    const {
        name
    } = cxt.request.body
    const result = await Products.findOne({
        name
    })
    // console.log(result)
    if (result) { //如果找到了 就提示商品名称重复
        cxt.body = {
            status: 1,
            msg: '该商品名称重复'
        }
    } else { //如果没有找到该商品 就添加该商品
        const product = await Products.create(cxt.request.body)
        cxt.body = {
            status: 0,
            data: product,
            msg: '添加商品成功',
        }
    }

}

// 获取商品
exports.getProducts = async cxt => {

    //获取页码和请求的数据量
    /*
        page   num     result
        1       3      [0,1,2]
        2       3      [3,4,5]
        3       3      [6,7,8]
        4       3      [9,10,11]
        n       3      [(page-1)*num,(page-1)*num+1,(page-1)*num+2]
    */
    let {
        page,
        num
    } = cxt.query
    page = +page
    num = +num
    let start = (page - 1) * num
    const result = await Products.find().skip(start).limit(num)
    // console.log(result)
    const total = await Products.find().countDocuments()
    // console.log(total)
    cxt.body = {
        status: 0,
        msg: '获取商品信息成功',
        data: {
            result, // 分页的数据
            total, // 产品的总数
        }
    }
}

//封装分页函数
// function filterPage(data, page, num) {
//     page = +page
//     num = +num
//     const total = data.length
//     let start = (page - 1) * num
//     let end = start + num > total ? total : start + num
//     let arr = []
//     for (let i = start; i < end; i++) {
//         arr.push(data[i])
//     }
//     return {
//         arr,
//         total
//     }
// }

// 查询商品
exports.searchProducts = async cxt => {
    // console.log(cxt.query)

    let {
        name,
        desc,
        page,
        num
    } = cxt.query
    page = +page
    num = +num
    let start = (page - 1) * num
    let result = null;
    let total = 0;
    if (desc) { // 如果按描述搜索
        // console.log('按描述搜索')
        result = await Products.find({
            desc: new RegExp(desc)
        }).skip(start).limit(num)
        total = await Products.find({
            desc: new RegExp(desc)
        }).countDocuments();
    } else { // 否则按名称搜索
        // console.log('按名称搜索')
        result = await Products.find({
            name: new RegExp(name)
        }).skip(start).limit(num)
        total = await Products.find({
            desc: new RegExp(name)
        }).countDocuments();
    }
    // console.log(result)
    cxt.body = {
        status: 0,
        msg: '商品查找成功',
        data: {
            result,
            total
        }
    }
}

// 修改商品
exports.updateProduct = async cxt =>{
    // console.log(cxt.request.body)
    const {_id,name} = cxt.request.body
    const result = await Products.findById({_id})
    if (result.name===name) { //如果前端传递的商品名 和查询到的商品名重复 
        cxt.body = {
            status: 1,
            msg: '商品已存在，不可修改'
        }
    } else {      //如果商品没有重复  那就修改该商品
        await Products.updateOne(result,{$set:cxt.request.body})
        cxt.body = {
            status: 0,
            msg: '修改商品成功',
        }
    }
}