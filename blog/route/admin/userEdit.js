const { User } = require('../../model/user.js');
module.exports = async(req, res) => {
    // 标识
    req.app.locals.currentLink = 'user';
    //获取用户地址栏中的id
    const { message, id } = req.query;

    if (id) {
        // id存在修改
        let user = await User.findOne({ _id: id });
        // 渲染用户编辑页面，回写数据
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    } else {
        // 添加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }
}