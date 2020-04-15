const fs = require('fs')
const path = require('path')

//引入商品模型
const Products = require('../schema/productSchema')
//上传图片
exports.uploadImg = async cxt=>{
    // console.log(cxt.req.file)  
    const {filename} = cxt.req.file
    cxt.body = {    //图片上传后台成功
        status:0,
        msg:'图片上传后台成功',
        data:{
            name:filename,
            url:`http://localhost:5000/uploads/${filename}`
        }
    }
}

//删除图片
exports.deleteImg = async cxt=>{
    const {name} = cxt.request.body
    const filename = path.join(__dirname,'../public/uploads',name)
    fs.unlinkSync(filename)
    cxt.body = {    //图片上传后台成功
        status:0,
        msg:'图片删除成功',
    }
}

//添加商品
exports.addProduct = async cxt=>{
    // console.log(cxt.request.body)
    const {name} = cxt.request.body
    const result = await Products.findOne({name})
    // console.log(result)
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



// 获取商品
exports.getProducts = async cxt=>{

    //获取页码和请求的数据量
    /*
        page   num     result
        1       3      [0,1,2]
        2       3      [3,4,5]
        3       3      [6,7,8]
        4       3      [9,10,11]
        n       3      [(page-1)*num,(page-1)*num+1,(page-1)*num+2]
    */
    let {page,num} = cxt.query
    const result = await Products.find()
    // console.log(result)
    cxt.body = {
        status:0,
        msg:'获取商品信息成功',
        data:filterPage(result,page,num)
    }
}


//封装分页函数
function filterPage(data,page,num){
    page = +page
    num = +num
    const total = data.length
    let start = (page-1)*num
    let end = start+num>total?total:start+num
    let arr = []
    for(let i=start;i<end;i++){
        arr.push(data[i])
    }
    return {
        arr,
        total
    }
}

