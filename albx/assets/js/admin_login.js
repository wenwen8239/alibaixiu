$(function () {
    // 给登录按钮注册点击事件
    $('#btn-login').on('click', function() {
        // 判断邮箱是否为空
        if (utile.valiDataEmpty('#email')) {
            // 弹出提示框
            $('#modelId').modal();
            // 修改提示框文字
            $('.modal-body>.container-fluid').text('邮箱不能为空');
            return;
        }
        // 判断密码是否为空
        if (utile.valiDataEmpty('#password')) {
            // 弹出提示框
            $('#modelId').modal();
            // 修改提示框文字
            $('.modal-body>.container-fluid').text('密码不能为空');
            return;
        }       
        // 验证邮箱格式是否正确
        let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        if (!reg.test($('#email').val())) {
            // 弹出提示框
            $('#modelId').modal();
            // 修改提示框文字
            $('.modal-body>.container-fluid').text('邮箱格式输入有误，请重新输入');
            return;
        }

        // 获取表单文本框的值
        let data = $('.login-wrap').serialize();
        $.post('/admin_do_login',data,(res) => {
            if (res.code == 200) {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框文字
                $('.modal-body>.container-fluid').text('登录成功');
                isLogin = true;
            }
            else {
                // 弹出提示框
                $('#modelId').modal();
                // 修改提示框文字
                $('.modal-body>.container-fluid').text('登录失败');
            }
        })
        let isLogin = false;
        $('#modelId').on('hide.bs.modal',() => {
            if (isLogin) {
                location.href = '/admin/index';
            }
        })
    })
    
})