$(function () {
    // 调用生成导航接口
    $.get('/getNavigation', (res) => {
        console.log(res);
        if (res.code == 200) {
            let html = '';
            res.data.forEach(e => {
                html += `<li><a href="/list?id=${e.id}"><i class="fa ${e.classname}"></i>${e.name}</a></li>`;
            });
            $('.nav').html(html);
        }
    })
})