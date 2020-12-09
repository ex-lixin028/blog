// 连接数据库
const mongoose = require('mongoose');
// 密码加密
const bcrypt = require('bcrypt');
const joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin: 管理员
    role: {
        type: String,
        required: true
    },
    // 0:启用 1:关闭
    state: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);


async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'pingan',
        email: 'li@pingan.com',
        password: result,
        role: 'admin',
        state: 0
    })
}

const validateUser = user => {
    // 定义对象规则
    const schema = {
        username: joi.string().min(2).max(12).required().error(new Error('用户名不符合要求')),
        email: joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式错误')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色信息有问题')),
        state: joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    //实施验证
    return joi.validate(user, schema);
}

// createUser();


module.exports = {
    User,
    validateUser
}