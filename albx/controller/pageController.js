// 引入adminUserModel模块
const adminUserModel = require('../model/adminUserModel');
// 引入分类目录模块
const categoriesModel = require('../model/categoriesModel');
// 引入postsMldel模块
const postsModel = require('../model/adminPostModel');

module.exports = {
    // 创建展示前台index页面方法
    getIndex(req,res) {
        res.render('index');
    },
    // 创建展示前台列表页面方法
    getList(req,res) {
        res.render('list');
    },
    // 创建展示前台详情页面方法
    getDetail(req,res) {
        res.render('detail');
    },
    // 创建展示后台index页面方法
    getAdminIndex(req,res) {
        // 判断用户是否登录过
        if (req.session.isLogin) {
            res.render('admin/index');
        }
        else {
            res.send('<script>location.href="/admin/login";</script>');
        }
        
    },
    // 创建展示后台分类目录方法
    getAdminCategories(req,res) {
        if (req.session.isLogin) {
            categoriesModel.getAllCategories((err, result) => {
                if(err) console.error(err);
                // 导入模板
                res.render('admin/categories',{arr:result});
            })
        }
        else {
            res.send('<script>location.href="/admin/login";</script>');
        } 
    },
    // 创建展示后台所有评论页面方法
    getAdminComments(req,res) {
        // 判断用户是否登录过
        if (req.session.isLogin) {
            res.render('admin/comments');
        }
        else {
            res.send('<script>location.href="/admin/login";</script>');
        }
    },
    // 创建展示后台写文章页面
    getAdminPostAdd(req,res) {
        if (req.session.isLogin) {
            res.render('admin/post-add');
        }
        else {
            res.send('<script>location.href="/admin/login";</script>');
        }
    },
    // 创建展示后台所有文章页面
    getAdminPosts(req,res) {
        if (req.session.isLogin) {
           // 读取数据，导入模板
            postsModel.getAllPosts((err,result) => {
                if (err) console.error(err);
                /* result.forEach(e => {
                    e.created = moment(e.created).format('YYYY-MM-DD HH:mm:ss');
                }); */
                res.render('admin/posts',{arr:result});
            })     
        } 
        else {
            res.send('<script>location.href="/admin/login";</script>');
        }       
    },
    // 创建展示后台我的个人资料页面
    getAdminProfile(req,res) {
        res.render('admin/profile');
    },
    // 创建展示后台网站设置页面
    getAdminSettings(req,res) {
        res.render('admin/settings');
    },
    // 创建展示后台图片轮播
    getAdminSlides(req,res) {
        res.render('admin/slides');
    },
    // 创建展示后台用户页面
    getAdminUsers(req,res) {
        res.render('admin/users');
    },
    // 创建展示后台登录页面方法
    getAdminLogin(req,res) {
        res.render('admin/login');
    }


}