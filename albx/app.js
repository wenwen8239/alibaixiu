// 引入express模块
const express = require('express');
// 引入body-parser模块
const bodyParser = require('body-parser');
// 引入路由模块
const router = require('./router');
// 引入session模块
const session = require('express-session');
// 创建服务器对象
const app = express();
// 设置端口
const port = 8080;
// 设置ip
const ip = '127.0.0.1';
// 监听端口
app.listen(port,ip,() =>{
    console.log('服务器已经开启，请通过http://127.0.0.1:8080开启');
})
// 请求静态资源
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

// 设置模板引擎
app.set('view engine','ejs');

// 注册body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));

// 注册session中间件
app.use(session({
    secret: 'login',
    resave: false,
    saveUninitialized: true
}));

// 注册路由中间件
app.use(router);
