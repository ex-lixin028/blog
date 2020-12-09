const joi = require('joi');

const schema = {
    username: joi.string().min(2).max(5).required().error(new Error('username 没有通过验证')),
    birth: joi.number().min(1900).max(2020).error(new Error('birth验证失败'))
};

async function run() {
    try {
        await joi.validate({ username: 'ab', birth: 1000 }, schema);
    } catch (e) {
        console.log(e.message);
        return;
    }
    console.log("通过");
}

run();