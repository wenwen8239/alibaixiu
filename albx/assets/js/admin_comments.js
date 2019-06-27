$(function () {
    // 获取所有评论数据
    function getAllComments(pageIndex,pageSize) {
        $.post('/getAllComments',{pageIndex,pageSize},(res) => {
            if (res.code == 200) {
                let html = template('tp',res.data);
                $('tbody').html(html);
                // 调用分页插件函数
                pagination(res.maxPage);
            }
        })
    }
    getAllComments(1,10);

    // 使用分页插件
    function pagination(maxPage) {
        $('.pagination').twbsPagination({
            totalPages: maxPage,
            visiblePages: 5,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (e, page) {
                // 获取所有分页
                getAllComments(page,10);
            }
        });
    }
    
})