const mongoose = require('mongoose')

function formate(date){
    return date.toLocalString
}

// 设置角色的数据格式
const roleSchema = new mongoose.Schema({
    name:String,
    create_time:{           // 角色创建的初始时间
        type:Date,
        default:Date.now    // 必须是函数的形式，不能是函数（new Date）
    },
    auth_name:String,       // 授权人
    auth_time:String,       // 授权时间
    menus:{                 // 角色的权限（可以访问的一些页面）
        type:Array,
        default:[]
    },            
})

// project 数据库下的 roles 使用 roleSchema 这个数据格式
module.exports = mongoose.model('roles',roleSchema)