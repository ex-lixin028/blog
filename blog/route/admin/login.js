const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res) => {
    // res.send(req.body);
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮箱/密码出现错误!!!' });
        // return res.status(400).send('错误');
    }

    let user = await User.findOne({ email });

    if (user) {
        // 解密盐比较密码
        let isvalue = await bcrypt.compare(password, user.password);
        if (isvalue) {
            // if (password == user.password) {
            console.log(user.username);
            // 用户名称和角色保存到session中-->登录校验
            req.session.username = user.username;
            req.session.role = user.role;

            req.app.locals.userInfo = user;
            if (user.role == 'admin') {
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/');
            }
        } else {
            return res.status(400).render('admin/error', { msg: '登录失败，邮箱/密码不正确' });
        }
    } else {
        return res.status(400).render('admin/error', { msg: '登录失败，邮箱不在' });
    }

}