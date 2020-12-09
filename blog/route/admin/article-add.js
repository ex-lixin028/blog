// 引入formidable第三方模块
const { log } = require('console');
const formidable = require('formidable');
const { Article } = require('../../model/article');
// path 路径
const path = require('path');
const { send } = require('process');

module.exports = (req, res) => {
    // 1. 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2. 配置上传文件存放的位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3. 保留上传文件的后缀
    form.keepExtensions = true;
    // 4. 解析表单
    form.parse(req, async(err, fields, files) => {
        // console.log(files.cover.path.split('public')[1]);
        // res.send(files);
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content,
        });
        res.redirect('/admin/article');
    });
}