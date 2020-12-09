const { required } = require("joi");

const { User } = require('../../model/user.js');

module.exports = async(req, res) => {
    // 标识
    req.app.locals.currentLink = 'user';

    // 获取当前页码
    let page = req.query.page || 1;
    // 获取每一页显示的条数
    let pageSize = 10;
    //查询用户的总条数
    let count = await User.countDocuments();
    //总页数
    let total = Math.ceil(count / pageSize);
    // 页码对应的数据查询开始位置
    let start = (page - 1) * pageSize;

    // skip:从第几条开始 limit：每一页有多少数据
    let users = await User.find({}).limit(pageSize).skip(start);
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });

    // res.send(users);
}