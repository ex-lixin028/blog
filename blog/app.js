// 引入express
const express = require('express');
const path = require('path');
// const template = require('express-art-template');
const bodyParser = require('body-parser');
const session = require('express-session');
// 引入时间
const dateFormat = require('dateformat');
// 导入模板
const template = require('art-template');
// 开发/生产环境信息记录 
const morgan = require('morgan');
// 导入config模块
const config = require('config');

// 创建数据库连接
require('./model/connect');
const home = require('./route/home');
const admin = require('./route/admin');
// 创建网站服务器
const app = express();
// post方式传递的数据 (二进制数据无法传递)
app.use(bodyParser.urlencoded({ extended: false }));

// 拦截所有请求
// app.use((req, res, next) => {

//     next();
// })

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 告诉express 框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态文件
app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'));

// process.env:获取系统环境变量 返回值是对象
if (process.env.NODE_ENV == 'development') {
    // 开发环境
    app.use(morgan('dev'));
    console.log('当前是开发环境');
} else {
    //生产环境
    console.log('当前是生产环境');
}


//cas模拟
app.use('/admin', require('./middleware/loginGuard'));

app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    const result = JSON.parse(err);

    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});


// 监听端口
app.listen(8081);
console.log('服务启动...');