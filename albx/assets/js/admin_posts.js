$(function () {

    $.post('/getPostByPage',{pageIndex:1,pageSize:10},(res) => {
        if (res.code == 200) {
            let html = template('tp',res.data);
            $('tbody').html(html);
        }
    })

    initPagination(1);
    function initPagination(currentIndex) {
        // 生成分页结构
        // 当前是第几页
        // let currentIndex = 10; 
        // 获取中间有多少个按钮
        let buttonCount = 5;
        // 根据当前页和总个数，生成开头和结尾
        let start = currentIndex - Math.floor((buttonCount - 1) / 2);
        // 算出结尾
        let end = start + (buttonCount - 1);

        // 从头开始到结尾，生成多个按钮
        let html = `<li class="page-item"><a class="page-link" data-index="${currentIndex-1}" href="javascript:void(0);">上一页</a></li>`;
        for (var i = start; i <= end; i++) {
            // 当i等于当前页的时候，给当前页添加选中状态
            if (i == currentIndex) {
                html += `<li class="page-item active"><a class="page-link" data-index="${i}" href="javascript:void(0);">${i}</a></li>`;
            }
            else {
                html += `<li class="page-item"><a class="page-link" data-index="${i}" href="javascript:void(0);">${i}</a></li>`;
            }
        }
        html += `<li class="page-item"><a class="page-link" data-index="${currentIndex+1}" href="javascript:void(0);">下一页</a></li>`;
        $('.pagination').html(html);
    }
    
    // 给分页按钮注册点击事件
    $('.pagination').on('click','.page-link',function () {
        // 获取当前页的id
        let pageIndex = parseInt($(this).attr('data-index'));
        // 设置一页显示的条数
        let pageSize = 10;
        $.post('/getPostByPage',{pageIndex,pageSize},(res) => {
            if (res.code == 200) {
                // 重新把模板引擎的结构赋值
                let html = template('tp',res.data);
                // 替换到tbody中
                $('tbody').html(html);
            }
            initPagination(pageIndex);            
        })
    })

    
})