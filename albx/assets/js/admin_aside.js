$(function () {
    // 获取浏览器的url路径
    let href = location.href;
    console.log(href);
    // 判断url中是否有包含指定的地址
    if (href.indexOf('/admin/posts') != -1 || href.indexOf('/admin/post-add') != -1 || href.indexOf('/admin/categories') != -1) {
        // 让一级菜单展开
        $('#post-top').attr('aria-expanded','true').removeClass('collapsed');
        // 给二级菜单添加show类
        $('#menu-posts').addClass('show');
    }
    else if (href.indexOf('/admin/slides') != -1 || href.indexOf('/admin/settings') != -1) {
        // 让一级菜单展开
        $('#menu-top').attr('aria-expanded','true').removeClass('collapsed');
        // 给二级菜单添加show类
        $('#menu-settings').addClass('show');
    }
    // 获取路径中当前文件的名字
    let index = href.indexOf('/admin/') + 7;
    let eleId = href.substring(index);
    eleId = eleId || 'index';
    // 添加一个active类
    $('#' + eleId).addClass('active');


    // 获取用户的头像和昵称
    $.get('/getUserHeadAndNickName',(res) => {
        if (res.code == 200) {
            // 修改头像
            $('.avatar').attr('src',res.data.avatar);
            // 修改昵称
            $('.name').text(res.data.nickname);
        }
    })
})