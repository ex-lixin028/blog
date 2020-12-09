const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 标识
    req.app.locals.currentLink = 'article';

    // 获取当前页码
    let page = req.query.page || 1;
    // 获取每一页显示的条数
    let page_size = 4;
    // 查询用户的总条数
    let count = await Article.countDocuments();
    // 总页数
    let total = Math.ceil(count / page_size);
    // 开始页
    let start = (page - 1) * page_size;

    let articles = await Article.find({}).limit(page_size).skip(start).populate('author').lean();

    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询请求
    // let articles = await pagination(Article).find().page(1).size(2).display(3).populate('author').exec(); // {{each articles.records}} 
    // res.send(articles);

    res.render('admin/article.art', {
        articles: articles,
        total: total,
        page: page
    });
}