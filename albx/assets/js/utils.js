// 这是一个工具类文件
// 创建一个空对象
let utile = {};
// 添加一个验证表单是否为空的方法
utile.valiDataEmpty = function (select) {
    let value = document.querySelector(select).value.trim();
    return value.length == 0; 
}

utile.parseUrlParameter = function(){
    //id=4&name=123&age=12&gender=男
    let arr = location.search.substring(1).split('&');
    // arr === ['id=4','name=123','age=12','gender=男'];
    let obj = {};
    arr.forEach((e)=>{
        let temp = e.split('='); // temp == ['id','4']
        obj[temp[0]] = temp[1];
    })
    return obj;
}