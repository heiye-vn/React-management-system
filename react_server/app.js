const Koa = require('koa');
const Router = new require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose')

const app = new Koa();
const router = new Router();
const {AddCategory,getCategorys} = require('./controller/category')

// 引入用户的模型
const Users = require('./schema/userSchema')

app.use(bodyParser()); // 注：该方法必须写在 app.use(router.routes()) 前面，否则就获取不到数据
app.use(static('./public'));
app.use(router.routes());


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

// 添加分类的逻辑
router.post('/category/add',AddCategory)

router.get('/category/list',getCategorys)

// 连接 27017 端口下的 project 数据库（名字可以自定义）
mongoose.connect('mongodb://localhost:27017/project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('27017/project数据库连接成功')
    app.listen(6000, () => {
        console.log('6000端口成功运行')
    })
}).catch(() => {
    console.log('27017/project数据库连接失败')
})