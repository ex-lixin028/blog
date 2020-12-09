const { User, validateUser } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {

    try {
        await validateUser(req.body);
    } catch (e) {
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }

    // 通过邮箱查询结果,如果存在表示已经注册过了
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱已经被注册' }));
    }
    console.log('验证通过');

    // 密码加密
    const salt = await bcrypt.genSalt(10); // 密码加密的复杂度
    const salt_password = await bcrypt.hash(req.body.password, salt);
    req.body.password = salt_password;
    // res.send(req.body);

    // 添加到数据库中
    await User.create(req.body);

    // 添加数据成功页面重定向到展示页面
    res.redirect('/admin/user');
}