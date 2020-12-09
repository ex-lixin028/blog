// 导入
const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 从数据库中查询数据
    // let result = await pagination(Article).page(1).size(4).display(5).find().populate('author').exec();

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

    let result = await Article.find({}).limit(page_size).skip(start).populate('author').lean();
    // res.send(result);
    // return;
    // 渲染模板并传递数据
    res.render('home/default.art', {
        result: result,
        total: total,
        page: page
    });
}