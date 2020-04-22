import jsonp from 'jsonp'

import ajax from './ajax'

// 暴露请求登录接口的函数
// export const reqLogin = (userInfo)=>axios.post('/login',userInfo)
export const reqLogin = (userInfo)=>ajax('/login',userInfo,'post')

/*
*      合法的城市   status:"success"
*      非法的城市   status:" No result available"
* */

// 暴露请求天气信息的接口函数
export const reqWeather = (city) =>{
    const url = 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2&callback=__jp1'
    return new Promise(res=>{
        jsonp(url,{},function(err,data){

            if(data.status === 'success'){
                data = data.results[0].weather_data[0]
                res(data)
            }else{
                res('非法的城市名')
            }
        })
    })
}

// 暴露请求添加分类信息的接口函数
// export const reqAddCategory = (categoryInfo) => axios.post('/category/add',categoryInfo)
export const reqAddCategory = (categoryInfo) => ajax('/category/add',categoryInfo,'post')

// 暴露请求所有分类信息的接口函数，如果 parentId为'0'，表示获取所有一级分类，如果不是'0'，表示获取所有二级分类
// export const reqgetCategorys = (parentId)=>axios.get('/category/list',{
//     params:{
//         parentId
//     }
// })

export const reqGetCategorys = (parentId)=>ajax('/category/list',{parentId})

// 暴露请求修改分类信息的接口函数
export const reqUpdateCategory = categoryInfo=>ajax('/category/update',categoryInfo,'post')

// 暴露请求删除后台图片的接口函数
export const reqDelteImg = (name)=>ajax('/img/delete',{name},'post')

// 暴露请求添加商品的接口函数
export const reqAddProduct = (productInfo)=>ajax('/product/add',productInfo,'post')

// 暴露请求获取指定页码数和指定商品数据量的接口函数
export const reqProducts = (page,num)=>ajax('/product/list',{page,num})

// 暴露请求根据搜索关键词以及不同的搜索类型搜索商品 的接口函数
export const reqSearchProducts = (page,num,keywords,searchType)=>ajax('/product/search',{
    page,
    num,
    // searchType,
    // keywords,
    [searchType]:keywords
})

// 暴露请求 修改商品 的接口函数
export const reqUpdateProduct = (productInfo)=>ajax('/product/update',productInfo,'post')

// 暴露请求 根据分类的id查找分类信息的接口函数
export const reqCategoryInfo = (categoryId)=>ajax('/category/info',{categoryId})

// 暴露请求 添加角色的接口函数
export const reqAddRole = (roleInfo)=>ajax('/role/add',roleInfo,'post')

// 暴露 请求所有角色集合的接口函数
export const reqGetRoles = ()=>ajax('/role/list')

// 暴露 修改角色权限的接口函数
export const reqUpdateRole = (roleInfo)=>ajax('/role/update',roleInfo,'post')

// 暴露请求 添加用户的接口函数
export const reqAddUser = (userInfo)=>ajax('/user/add',userInfo,'post')

// 暴露请求 获取所有用户信息的接口函数
export const reqGteUsers = ()=>ajax('/user/list')
