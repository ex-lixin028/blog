const guard = (req, res, next) => {
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 如果用户权限不是admin 就阻止进入，并重定向到home
        if (req.session.role == 'normal') {
            return res.redirect('/home/');
        }
        next();
    }
}

module.exports = guard;