const { Article } = require('../../model/article');
const { Common } = require('../../model/common');

module.exports = async(req, res) => {

    let id = req.query.id;
    let article = await Article.findOne({ _id: id }).populate('author').lean();
    let common = await Common.find({ aid: id }).populate('uid').lean();
    res.render('home/article.art', {
        // article: article
        article,
        common
    });
}