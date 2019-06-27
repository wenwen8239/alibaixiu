$(function () {

    // 动态生成最新发布文章
    $.post('/getNewestPosts',(res) => {
        console.log(res);
        if (res.code == 200) {
            let html = template('tp',res.data);
            $('.new').append(html);
        }
    })

    
})