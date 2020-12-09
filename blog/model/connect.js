const config = require('config');
// 连接数据库
const mongoose = require('mongoose');
//              mongodb://lixin:lixin@localhost:27107/blog
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true })
    .then(() => { console.log('数据库连接成功...') })
    .catch((error) => { "数据库连接失败.." + error });