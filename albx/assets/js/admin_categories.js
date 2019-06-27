$(function () {
    // 给图标注册点击事件
    $('.icons').on('click', function () {
        // 将所有图标显示
        $('.icons-contain').toggle();
    })
    // 点击小图标切换图片
    $('.icons-inner > .fa').on('click', function () {
        // 获取当前点击的图标的名称
        let icon = $(this).attr('class');
        // 把页面上的图标class修改为选中的图标的class
        $('.icons > .fa').attr('class',icon);
        // 还要把隐藏域的value改成选中的图标的名称
        $('#classname').val(icon.substring(3));
    })
    // 给添加按钮注册点击事件
    $('.btn-add').on('click', function () {
        // 判断表单文本框的值是是否为空
        if (utile.valiDataEmpty('#name')) {
            // 弹出提示框
            $('#modelId').modal();
            // 修改提示框的内容
            $('.modal-body>.container-fluid').text('名称不能为空');
            return;
        }
        if (utile.valiDataEmpty('#slug')) {
            // 弹出提示框
            $('#modelId').modal();
            // 修改提示框的内容
            $('.modal-body>.container-fluid').text('别名不能为空');
            return;
        }
        // 获取表单文本框的值
        let data = $('#form').serialize();
        $.post('/addNewCategory',data,(res) => {
            if (res.code == 200) {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框的内容
                $('.modal-body>.container-fluid').text(res.msg);
                let html = template('tp',res.data);
                // 把数据动态添加到tbody里面
                $('tbody').append(html);
                // 修改文本框的值
                $('#name').val('');
                $('#slug').val('');
                $('.icons>.fa').attr('class','fa fa-glass');
            }
            else {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框的内容
                $('.modal-body>.container-fluid').text(res.msg);
            }
        })
    })

    // 定义一个变量存储删除的数据
     delId = null;
     delTr = null;
    // 给删除注册点击事件
    $('tbody').on('click','.btn-danger',function () {
        delTr = $(this).parents('tr');
        delId = delTr.attr('data-id');
        $.get('/deleteCategoryById',{id : delId},function (res) {
            if (res.code == 200) {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框的内容
                $('.modal-body>.container-fluid').text('你确定要删除吗？');
                isSuccess = true;
            }
            else {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框的内容
                $('.modal-body>.container-fluid').text('删除失败');
            }
        })
    })
    let isSuccess = false;
    $('#modelId').on('hide.bs.modal',() => {
        if (isSuccess) {
            delTr.remove();
        }
    })
    let editEle = null;
    // 给编辑注册点击事件
    $('tbody').on('click','.btn-info', function () {
        let id = $(this).parents('tr').attr('data-id');
        editEle = $(this).parents('tr');
        // 获取数据库最新的数据
        $.get('/getCategoryById',{id},(res) => {
            if (res.code == 200) {
                // 把数据写入表单里面
                $('#name').val(res.data.name);
                $('#slug').val(res.data.slug);
                // 修改图标
                $('.icons>.fa').attr('class','fa ' + res.data.classname);
                // 修改隐藏域的类名
                $('.classname').val(res.data.classname);
                // 获取表单的第一个元素
                let first = $('#form').children().eq(0);
                // 判断第一个元素的type属性是不是hidden
                if (first.attr('type') === 'hidden') {
                    // 如果是就直接修改val值
                    first.val(res.data.id);
                }
                else {
                    let idInput = $('<input type="hidden" name="id" value="'+ res.data.id +'">');
                    $('#form').prepend(idInput);
                }
                // 把添加按钮隐藏
                $('#btn-add').parent().attr('hidden','true');
                $('#btn-save').parent().removeAttr('hidden');
            }
        })
    })
    // 给保存按钮注册点击事件
    $('#btn-save').on('click', function () {
        // 收集表单数据
        let data = $('#form').serialize();
        $.post('/editCategoryById',data,(res) => {
            if (res.code == 200) {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框的内容
                $('.modal-body>.container-fluid').text(res.msg);
                editEle.children().eq(1).text(res.data.name);
                editEle.children().eq(2).text(res.data.slug);
                editEle.children().eq(3).children().attr('class','fa ' + res.data.classname);
            }
            else {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框的内容
                $('.modal-body>.container-fluid').text(res.msg);
            }
        })
    })

    // 点击取消按钮
    $('#btn-cancel').on('click', function () {
        // 把添加按钮显示
        $('#btn-add').parent().removeAttr('hidden');
        // 保存按钮隐藏
        $('#btn-save').parent().attr('hidden','true');
        // 修改文本框的值
        $('#name').val('');
        $('#slug').val('');
        $('.icons>.fa').attr('class','fa fa-glass');
        // 把表单的第一个子元素移除
        $('#form').children().eq(0).remove();
    })

    // 实现按钮的全选反选功能
    $('thead input[type=checkbox]').on('click',function(){
        // 获取当前按钮的选中状态
        let status = $(this).prop('checked');
        // 将下面全部按钮的状态修改为全选按钮的状态
        $('tbody input[type=checkbox]').prop('checked',status);
        // 将全部批量删除按钮显示
        status ? delBtn.show() : delBtn.hide();
    })
    let delBtn = $('.page-action > .btn-danger');
    
    // 实现下面按钮全部选中的时候将全选按钮选中
    $('tbody').on('click','input[type=checkbox]', function () {
        // 获取下面全部按钮的个数
        let all = $('tbody input[type=checkbox]').length;
        // 获取选中的按钮的个数
        let checked = $('tbody input[type=checkbox]:checked').length
        // 判断下面按钮选中的个数与总个数进行比较
        let checkedAll = checked === all;
        // 修改全选按钮的状态
        $('thead input[type=checkbox]').prop('checked',checkedAll);
        // 当下面按钮选中的个数大于1的时候显示批量删除按钮
        checked > 1 ? delBtn.show() : delBtn.hide();
    })

    // 批量删除
    delBtn.on('click', function () {
        // 获取勾选的id
        let checked = $('tbody input[type=checkbox]:checked');
        // 获取选中的所有tr
        let trs = $('tbody input[type=checkbox]:checked').parents('tr');
        // 创建一个数组存放所有id
        let ids = [];
        // 遍历所有选中的元素
        checked.each(function (i,e) {
            // 获取当前点击的元素的父元素的id
            let id = $(e).parents('tr').attr('data-id');
            // 把id添加到数组中
            ids.push(id);
        });
        // 请求批量删除接口
        $.get('/deleteMultiple',{ids},(res) => {
            if (res.code == 200) {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框的内容
                $('.modal-body>.container-fluid').text(res.msg);
                // 删除页面上选中的元素
                trs.remove();
            }
            else {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框的内容
                $('.modal-body>.container-fluid').text(res.msg);
            }
        })
    })

    // 给隐藏按钮注册点击事件
    $('tbody').on('click','.btn-warning', function () {
        // 获取当前点击元素的父元素
        let tr = $(this).parents('tr');
        // 获取当前点击元素的父元素的id
        let id = $(this).parents('tr').attr('data-id');
        // 调用让导航在页面隐藏的接口
        $.get('/hideNavigation',{id},(res) => {
            if (res.code == 200) {
                let html = `<a href="javascript:;" class="btn btn-success btn-sm">显示</a>&nbsp;&nbsp;&nbsp;&nbsp;<span
                class="text-warning">当前没有在网站导航中显示</span>`;
                tr.children().eq(4).html(html);
            }

        })
    })

    // 给显示按钮注册点击事件
    $('tbody').on('click','.btn-success', function () {
        // 获取当前点击元素的父元素
        let tr = $(this).parents('tr');
        // 获取当前点击元素的父元素的id
        let id = $(this).parents('tr').attr('data-id');
        // 调用让导航在页面隐藏的接口
        $.get('/showNavigation',{id},(res) => {
            if (res.code == 200) {
                let html = `<a href="javascript:;" class="btn btn-warning btn-sm">隐藏</a>&nbsp;&nbsp;&nbsp;&nbsp;<span
                class="text-success">当前在网站导航中显示</span>`;
                tr.children().eq(4).html(html);
            }

        })
    })
})