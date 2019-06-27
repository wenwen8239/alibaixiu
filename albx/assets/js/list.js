$(function () {
    // 获取地址栏传递的id
    let id = utile.parseUrlParameter().id;
    console.log(id);
    function getPostsById() {
        $.get('/getPostsById',{id,pageIndex:currentIndex,pageSize:5},(res) => {
            console.log(res);
            if (res.code == 200) {
                let categoriesName = res.data[0].name;
                $('.new > h3').html(categoriesName);
                let html = template('tp',res.data);
                $('.new').append(html);
            }
        })
    }
    let currentIndex = 1;
    // 调用获取单页数据函数
    getPostsById();
    // 给加载更多注册点击事件
    $('#btn-load-more').on('click', function () {
        // 加载更多的分页数据
        // 页数++
        currentIndex++;
        // 调用获取单页数据函数
        getPostsById();
    })
})