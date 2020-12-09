module.exports = (req, res) => {
    // 标识
    req.app.locals.currentLink = 'article';

    res.render('admin/article-edit.art');
}