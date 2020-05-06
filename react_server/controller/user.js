//引入用户模型
const Users = require('../schema/userSchema')

// 添加用户
exports.addUser = async cxt =>{
    // console.log(cxt.request.body)
    const {username} = cxt.request.body
    const result = await Users.findOne({username})
    if(result){     // 如果找到了，就提示用户重复
        cxt.body = {
            status:1,
            msg:'用户已存在'
        }
    }else{          // 如果没找到，就添加用户信息
        const user = await Users.create(cxt.request.body)
        cxt.body = {
            status:0,
            data:user,
            msg:'用户添加成功'
        }
    }
}

// 获取所有用户集合
exports.getUsers = async cxt => {
    //找到所有的角色信息   username 不等于 admin 的（not equal）
    const result = await Users.find({username:{$ne:'admin'}})
    // console.log(result)
    if (result.length) {   //如果找到了角色集合，就把集合返回给前台
        cxt.body = {
            status: 0,
            msg: '获取用户成功',
            data: result
        }
    }else{
        cxt.body = {
            status: 1,
            msg: '获取用户列表失败',
        }
    }

}

// 修改用户信息
exports.updateUser = async cxt =>{
    // console.log(cxt.request.body)
    const {_id,username} = cxt.request.body
    const result = await Users.findById({_id})
    if(result.username === username ){      // 如果前台传入的用户名和查找的用户名相等
        cxt.body = {
            status:1,
            msg:'用户名已存在，不可修改'
        }
    }else{
        await Users.updateOne(result,{$set:cxt.request.body})
        cxt.body = {
            status:0,
            msg:'用户信息修改成功'
        }
    }

}

// 删除用户信息
exports.deleteUser = async cxt =>{
    // console.log(cxt.request.body)
    const {_id} = cxt.request.body
    await Users.deleteOne({_id})
    cxt.body = {
        status:0,
        msg:'用户删除成功'
    }
}
