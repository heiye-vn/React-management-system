const Categorys =  require('../schema/categorySchema')      // 引入分类模型

// 添加分类（添加一级分类时会把 '0' 作为parentId存到数据库，添加二级分类时会把当前一级分类的_id作为parentId存到数据库中）
exports.AddCategory =  async cxt=>{
    // console.log(cxt.request.body)
    const {parentId,categoryName} = cxt.request.body
    const result = await Categorys.findOne({name:categoryName})
    console.log(result)
    if(result){     // 如果找到了，就提示分类名称重复
        cxt.body = {
            status:1,
            msg:'该分类名已存在'
        }
    }else{          // 如果没找到，就添加该分类
        const category = await Categorys.create({name:categoryName,parentId})
        cxt.body = {
            status:0,
            data:category,
            msg:'分类添加成功'
        }
    }
}

// 获取所有分类集合
exports.getCategorys =  async cxt=>{
    // console.log(cxt.request.query)
    const {parentId} = cxt.request.query

    // 找到所有的一级分类
    const result = await Categorys.find({parentId})

    if(result.length){  // 如果从数据库中找到了分类集合，就把该集合返回给前台
        cxt.body = {
            status:0,
            data:result,
            msg:'获取分类成功'
            
        }
    }else{
        cxt.body = {
            status:1,
            msg:'获取分类失败'
            
        }
    }
}


//修改分类
exports.updateCategory = async cxt => {
    // console.log(cxt.request.body)
    const { categoryName ,_id} = cxt.request.body
    const result = await Categorys.findById({_id})
    if (result.name===categoryName) { //如果前端传递的分类名 和查询到的分类名重复 
        cxt.body = {
            status: 1,
            msg: '分类已存在，不可修改'
        }
    } else {      //如果分类没有重复  那就修改该分类
        await Categorys.updateOne(result,{$set:{name:categoryName}})
        cxt.body = {
            status: 0,
            msg: '修改分类成功',
        }
    }
}
