const mongoose =  require('mongoose')

//设置商品表的数据格式
const productSchema = new mongoose.Schema({
   name:String, //商品的名字
   desc:String, //商品的描述
   price:String,              
   categoryId:String,    
   pCategoryId:String, 
   imgs:Array, // [图片1的name,图片2的name...]
   details:String,
})

/*
    如果前台数据是 [一级分类id,二级分类id]
        categoryId      二级分类id
        pCategoryId     一级分类id

    如果前台数据是 [一级分类id]
        categoryId      二级分类id
        pCategoryId     '0'

*/ 


module.exports = mongoose.model('products',productSchema)




