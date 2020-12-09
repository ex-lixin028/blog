/**
 * 将数组转换为对象
 * @param {*} form 需要提交的表单对象
 */
function serializeToJson(form) {
    var result = {};
    var f = form.serializeArray();
    f.forEach(function(item) {
        // {name: "email", value: "34324@qq.com"}
        // result.email = 
        result[item.name] = item.value;
    });
    return result;
}