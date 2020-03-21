const Koa = require('koa');
const Router = new require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose')

const app = new Koa();
const router = new Router();

app.use(bodyParser());      // 注：该方法必须写在 app.use(router.routes()) 前面，否则就获取不到数据
app.use(static('./public'));
app.use(router.routes());


router.post('/login',async cxt=>{
    cxt.body = cxt.request.body
    console.log(cxt.body)
    cxt.body = '返回信息'

})

// 连接 27017 端口下的 project 数据库（名字可以自定义）
mongoose.connect('mongodb://localhost:27017/project',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('数据库连接成功')
}).catch(()=>{
    console.log('数据库连接失败')
})

app.listen(6000,()=>{
    console.log('6000端口成功运行')
})