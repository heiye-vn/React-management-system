const fs = require('fs')
const path = require('path')

// 上传图片
exports.uploadImg = async (cxt)=>{
    const {filename} = cxt.req.file
    cxt.body = {        // 图片上传成功后返回给前台的数据
        status:0,
        msg:'图片上传成功',
        data:{
            name:filename,
            url:`http://localhost:5000/uploads/${filename}`
        },
    }
}

// 删除图片
exports.deleteImg = async (cxt)=>{

    const {name} = cxt.request.body

    const filename = path.join(__dirname,'../public/uploads',name)
    fs.unlinkSync(filename)
    cxt.body = {        // 图片删除后返回给前台的信息
        status:0,
        msg:'图片删除成功'
    }

}