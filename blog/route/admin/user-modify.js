const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    // 获取body 用户修改的参数
    const { username, email, role, state, password } = req.body;
    // 获取地址栏中的id数据
    const id = req.query.id;

    let user = await User.findOne({ _id: id });

    // 数据库中密码和用户修改的密码比较
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        // 相同
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        res.redirect('/admin/user');
    } else {
        // 不同
        let obj = { path: '/admin/user-edit', message: '密码比对失败,无法修改数据..', id: id };
        next(JSON.stringify(obj));
    }
}