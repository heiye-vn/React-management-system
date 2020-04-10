const mongoose = require('mongoose')

// 设置分类的数据格式
const categorySchema = new mongoose.Schema({
    name:String,        // 分类的名字
    parentId:{          // 如果是 '0'，表示为一级分类 如果不是 '0'，表示为二级分类
        type:String,
        default:'0'
    }

})

// project 数据库下的 categorys 使用 categorySchema 这个数据格式
module.exports = mongoose.model('categorys',categorySchema)