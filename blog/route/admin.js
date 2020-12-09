const express = require('express');
const admin = express.Router();

const { User } = require('../model/user');

// 登录页面
admin.get('/login', require('./admin/loginPage'));

// 用户页面
admin.get('/user', require('./admin/userPage'));

// 登录
admin.post('/login', require('./admin/login'));

// 登出
admin.get('/logout', require('./admin/logout'));

// 用户添加
admin.get('/user-edit', require('./admin/userEdit'));

// 用户修改
admin.post('/user-modify', require('./admin/user-modify'));

// 删除
admin.get('/user-delete', require('./admin/user-delete'));

admin.post('/user-edit', require('./admin/userEdit-fn'));


// 文章列表页面路由
admin.get('/article', require('./admin/article'));
// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'));


module.exports = admin;