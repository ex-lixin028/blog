const { Common } = require('../../model/common');
module.exports = async(req, res) => {
    // 请求参数
    const { content, uid, aid } = req.body;
    //创建数据保存到集合中
    await Common.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });
    res.redirect('/home/article?id=' + aid);
}