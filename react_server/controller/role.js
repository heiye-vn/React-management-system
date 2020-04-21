//引入角色模型
const Roles = require('../schema/roleSchema')

//添加角色
exports.addRole = async cxt => {
    
    const {roleName} = cxt.request.body
    // console.log(cxt.request.body,1111,Date.now(),typeof Date.now())
    const result = await Roles.findOne({ name: roleName })
    if (result) { //如果找到了 就提示角色名称重复
        cxt.body = {
            status: 1,
            msg: '该角色名称重复'
        }
    } else {      //如果没有找到该角色 就添加该角色
        const role = await Roles.create({ name: roleName})
        // console.log(role)
        cxt.body = {
            status: 0,
            data: role,
            msg: '添加角色成功',
        }
    }
}

//获取所有的角色集合
exports.getRoles = async cxt => {
    // console.log(cxt.query)
    //找到所有的角色信息
    const result = await Roles.find()
    // console.log(result)
    if (result.length) {   //如果找到了角色集合  那就把集合返回给前台
        cxt.body = {
            status: 0,
            msg: '获取角色成功',
            data: result
        }
    }else{
        cxt.body = {
            status: 1,
            msg: '获取角色列表失败',
        }
    }

}

