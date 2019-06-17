// 这是一个工具类文件
// 创建一个空对象
let utile = {};
// 添加一个验证表单是否为空的方法
utile.valiDataEmpty = function (select) {
    let value = document.querySelector(select).value.trim();
    return value.length == 0; 
}