// 创建评论集合规则
// 1.引入mongoose模板
const mongoose = require('mongoose');

// 2.创建文章集合规则
const commonSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
    }
});

// 3.根据规则创建集合
const Common = mongoose.model('Common', commonSchema);

// 4.将集合规则作为模板成员进行导出
module.exports = {
    Common
}