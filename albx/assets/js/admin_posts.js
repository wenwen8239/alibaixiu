$(function () {
    
    /* 
        @param {object} params
        @example {
            categoryId : 分页的id，
            status : 状态,
            pageIndex : 获取第几页数据,
            pageSize : 页容量
        }
        
    */
    
// 封装请求页面分页接口函数
// function getPageData(pageIndex,pageSize) {
// 传递的参数太多，使用对象来传
function getPageData(params) {
    // 这个是没有做筛选时候的接口
    // $.post('/getPostByPage',{ pageIndex,pageSize },(res) => {
    // 把获取数据的接口替换成筛选的接口
    $.post('/getPostByFilter',params,(res) => {
        if (res.code == 200) {
            let html = template('tp',res.data);
            $('tbody').html(html);
            // 生成分页按钮
            initPagination(params.pageIndex,res.maxPage); 
        }
    })
}
    
    // 页面加载完成调用分页函数
    getPageData({
        categoryId : 'all',
        status : 'all',
        pageIndex : 1,
        pageSize : 10,
    });

    // 封装生成分页按钮函数
    function initPagination(currentIndex,maxPage) {
        // 生成分页结构
        // 当前是第几页
        // let currentIndex = 10; 
        // 获取中间有多少个按钮
        let buttonCount = 5;
        // 根据当前页和总个数，生成开头和结尾
        let start = currentIndex - Math.floor((buttonCount - 1) / 2);1
        if (start <= 1) {
            start = 1;
        }
        // 算出结尾
        let end = start + (buttonCount - 1);
        if (end >= maxPage) {
            end = maxPage;
            // 从新算出从end往前走的5个按钮
            start = end - (buttonCount - 1);
            // 为了防止页数小于按钮的个数
            if (start <= 1) {
                start = 1;
            }
        }
        // 从头开始到结尾，生成多个按钮
        let html = '';
        // 如果当前是第一页，就没有上一页按钮
        if (currentIndex != 1) {
            html += `<li class="page-item"><a class="page-link" data-index="${currentIndex-1}" href="javascript:void(0);">上一页</a></li>`;
        }
        for (var i = start; i <= end; i++) {
            // 当i等于当前页的时候，给当前页添加选中状态
            if (i == currentIndex) {
                html += `<li class="page-item active"><a class="page-link" data-index="${i}" href="javascript:void(0);">${i}</a></li>`;
            }
            else {
                html += `<li class="page-item"><a class="page-link" data-index="${i}" href="javascript:void(0);">${i}</a></li>`;
            }
        }
        if (currentIndex !== maxPage) {
            html += `<li class="page-item"><a class="page-link" data-index="${currentIndex+1}" href="javascript:void(0);">下一页</a></li>`;
        }
        $('.pagination').html(html);
        
    }
    
// 给分页按钮注册点击事件
$('.pagination').on('click','.page-link',function () {
    // 获取当前页的id
    let pageIndex = parseInt($(this).attr('data-index'));
    // 设置一页显示的条数
    let pageSize = 10;
    let categoryId = $('#category').val();
    let status = $('#status').val();
    // 调用分页函数
    getPageData({categoryId,status,pageIndex,pageSize});
})

    // 生成所有分类数据
    $.get('/getAllCategory',(res) => {
        console.log(res);
        if (res.code == 200) {
            // 生成结构
            let html = `<option value="all">所有分类</option>`;
            // 使用循环把所有的分类都遍历出来
            for (let i = 0; i < res.data.length; i++) {
                html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`;
            }
            // 把结构添加到select中
            $('#category').html(html);
        }
    })

// 给筛选注册点击事件
$('#btn-filter').on('click',function () {
    // 获取分类数据的id
    let categoryId = $('#category').val();
    let status = $('#status').val();
    getPageData({categoryId,status,pageIndex : 1,pageSize : 10});
    // 调用筛选对应数据的接口
    /*  $.post('/getPostByFilter',{ categoryId,status,pageIndex : 1,pageSize : 10 },(res) => {
        if (res.code == 200) {
            let html = template('tp',res.data);
            $('tbody').html(html);
        }
    }) */
})

    
    
})