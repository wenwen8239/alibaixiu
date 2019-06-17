// 先引入express模块
const express = require('express');
// 创建路由对象
const router = express.Router();
// 引入pageController模块
const pageController = require('./controller/pageController');
// 引入adminController模块
const adminUsercontroller = require('./controller/adminUserController');
// 引入分类目录控制器
const categoriesController = require('./controller/adminCategoriesController');
// 引入所有文章控制器
const postsController = require('./controller/adminPostController');
// 实现前台index页面的展示
router.get('/',(req,res) => {
    pageController.getIndex(req,res);
})
router.get('/index',(req,res) => {
    pageController.getIndex(req,res);
})
// 实现前台列表页面的展示
router.get('/list',(req,res) => {
    pageController.getList(req,res);
})
// 实现前台详情页面的展示
router.get('/detail',(req,res) => {
    pageController.getDetail(req,res);
})
// 实现后台index页面展示
router.get('/admin',(req,res) =>{
    pageController.getAdminIndex(req,res);
})
router.get('/admin/index',(req,res) =>{
    pageController.getAdminIndex(req,res);
})
// 实现后台分类目录页面展示
router.get('/admin/categories',(req,res) =>{
    pageController.getAdminCategories(req,res);
})
// 实现后台所有评论页面展示
router.get('/admin/comments',(req,res) =>{
    pageController.getAdminComments(req,res);
})
// 实现后台写文章页面展示
router.get('/admin/post-add',(req,res) =>{
    pageController.getAdminPostAdd(req,res);
})
// 实现后台所有文章页面展示
router.get('/admin/posts',(req,res) =>{
    pageController.getAdminPosts(req,res);
})
// 实现后台我的个人资料页面展示
router.get('/admin/profile',(req,res) =>{
    pageController.getAdminProfile(req,res);
})
// 实现后台网站设置页面展示
router.get('/admin/settings',(req,res) => {
    pageController.getAdminSettings(req,res);
})
// 实现后台图片轮播页面展示
router.get('/admin/slides',(req,res) =>{
    pageController.getAdminSlides(req,res);
})
// 实现后台用户页面展示
router.get('/admin/users',(req,res) =>{
    pageController.getAdminUsers(req,res);
})
// 实现后台登录页面展示
router.get('/admin/login',(req,res) =>{
    pageController.getAdminLogin(req,res);
})
// 实现用户登录
router.post('/admin_do_login',(req,res) => {
    adminUsercontroller.adminDoLogin(req,res);
})
// 实现用户头像和昵称
router.get('/getUserHeadAndNickName',(req,res) => {
    adminUsercontroller.getUserHeadAndNickName(req,res);
})
// 添加分类数据
router.post('/addNewCategory',(req,res) => {
    categoriesController.addNewCategory(req,res);
})
// 删除分类目录数据
router.get('/deleteCategoryById',(req,res) =>{
    categoriesController.deleteCategoryById(req,res);
})
// 实现通过id获取要编辑的数据
router.get('/getCategoryById',(req,res) => {
    categoriesController.getCategoryById(req,res);
})
// 实现编辑分类目录数据
router.post('/editCategoryById',(req,res) => {
    categoriesController.editCategoryById(req,res);
})
// 监听批量删除
router.get('/deleteMultiple',(req,res) => {
    categoriesController.deleteMultiple(req,res);
})
// 监听分页
router.post('/getPostByPage',(req,res) => {
    postsController.getPostByPage(req,res);
})
// 暴露路由对象
module.exports = router;