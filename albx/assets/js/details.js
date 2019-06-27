$(function () {
    // 获取地址栏传递过来的id值
    let id = utile.parseUrlParameter().id;
    $.get('/getPostDataById',{id},(res) => {
        console.log(res);
        if (res.code == 200) {
            let html = `<div class="article">
            <div class="breadcrumb">
                <dl>
                <dt>当前位置：</dt>
                <dd><a href="javascript:;">${res.data.name}</a></dd>
                </dl>
            </div>
            <h2 class="title">
                <a href="/detail?id=${res.data.id}">${res.data.title}</a>
            </h2>
            <div class="meta">
                <span>${res.data.nickname} 发布于 ${res.data.created}</span>
                <span>分类: <a href="/list?id=${res.data.category_id}">${res.data.name}</a></span>
                <span>阅读: (${res.data.views})</span>
                <span>评论: (143)</span>
            </div>
            <div class="content-detail">${res.data.content}</div>
            </div>`;
            $(".content").prepend(html);
        }
    })
})