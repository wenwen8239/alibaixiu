$(function () {

    // 生成所有分类
    $.get('/getAllCategory',(res) => {
        if (res.code == 200) {
            let html = '';
            for(var i = 0; i < res.data.length; i++) {
                html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`;
            }
            // 把生成的数据添加到所属分类中
            $('#category').html(html);
        }
    })

    // 给选择文件注册change事件
    $('#feature').on('change', function () {
        // 获取图片
        // 将文件转换为二进制数据
        let img = this.files[0];
        let fd = new FormData();
        fd.append('pic',img);
        fd.append('name','狗蛋');

        $.ajax({
            type: 'post',
            url: '/uploadImage',
            data : fd,
            // 不要请请求头
            contentType: false,
            processData: false,
            success(res) {
                if (res.code == 200) {
                    // 修改页面的图片显示
                    $('.thumbnail').attr('src',res.data).show();
                    // 把图片的路径存放到隐藏域中
                    $('#img').val(res.data);
                    console.log($('#img').val());
                }
            }
        })
    })

    // 调用富文本插件
    CKEDITOR.replace('content');

    // 给保存按钮注册点击事件
    $('#btn-save').on('click', function() {
        // 把文本域的内容，同步回文本域里面
        CKEDITOR.instances.content.updateElement();
        // 获取表单文本框的值
        let data = $('#form').serialize();
        // console.log(data);
        $.post('/addNewPosts',data,(res) => {
            if (res.code == 200) {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框文字
                $('.modal-body>.container-fluid').text('新增成功');
            }
            else {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框文字
                $('.modal-body>.container-fluid').text('新增失败');
            }
        })
        
    })
})