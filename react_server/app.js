const Koa = require('koa');
const Router = new require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose')
const multer = require('koa-multer')
const path = require('path')

const app = new Koa();
const router = new Router();
const {
    AddCategory,
    getCategorys,
    updateCategory,
    getCategory
} = require('./controller/category')
const {
    uploadImg,
    deleteImg,
    addProduct,
    getProducts,
    searchProducts,
    updateProduct
} = require('./controller/product')
const {
    addRole,
    getRoles
} = require('./controller/role')

// 引入用户的模型
const Users = require('./schema/userSchema')

app.use(bodyParser()); // 注：该方法必须写在 app.use(router.routes()) 前面，否则就获取不到数据
app.use(static('./public'));
app.use(router.routes());

//文件上传
//配置
var storage = multer.diskStorage({
    //文件保存在后台的路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        // console.log(file)
        const extname = path.extname(file.originalname)     // 获取图片的后缀名
        // console.log(extname)
        cb(null, Date.now() + extname);
    }
})
//加载配置
var upload = multer({
    storage: storage
});


router.post('/login', async cxt => {
    // 获取前端用户信息
    const {
        username,
        password
    } = cxt.request.body
    // console.log(username,password)

    // 根据用户名和密码查找，如果找到该用户，则登录成功， 否则用户名或者密码不正确 
    const user = await Users.findOne({
        username,
        password
    })
    // console.log(user)

    if (user) { // 如果找到了用户信息
        cxt.body = {
            status: 0,
            data: user,
            msg: "用户验证成功！"
        }
    } else {
        cxt.body = {
            status: 1,
            msg: "用户名或者密码错误！"
        }
    }


})

// 分类的路由处理逻辑
router.post('/category/add', AddCategory)
router.get('/category/list', getCategorys)
router.post('/category/update', updateCategory)
router.get('/category/info', getCategory)

// 图片的路由处理逻辑
router.post('/img/upload',upload.single('image'), uploadImg)    // 专门接收前端上传图片的name是 image 的图片
router.post('/img/delete',deleteImg)

// 商品的路由处理逻辑 
router.post('/product/add',addProduct)
router.get('/product/list',getProducts)
router.get('/product/search',searchProducts)
router.post('/product/update',updateProduct)

// 角色的路由处理逻辑
router.post('/role/add',addRole)
router.get('/role/list',getRoles)





// 连接 27017 端口下的 project 数据库（名字可以自定义）
mongoose.connect('mongodb://localhost:27017/project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('27017/project数据库连接成功')
    app.listen(5000, () => {
        console.log('5000端口成功运行')
    })
}).catch(() => {
    console.log('27017/project数据库连接失败')
})