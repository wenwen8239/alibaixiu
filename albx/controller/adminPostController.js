const adminPostsModel = require('../model/adminPostModel');
// 引入富文本模块
const formidable = require('formidable');
// 引入格式化日期模块
const moment = require('moment');
module.exports = {
    // 获取分页数据
    getPostByPage(req,res) {
        let {pageIndex,pageSize} = req.body;
        adminPostsModel.getPostsByPage(pageIndex,pageSize,(err,result) => {
            if (err) console.error(err);
            
            let resObj = {};
            if (result.length > 0) {
                resObj = {
                    code : 200,
                    msg : '获取成功',
                    data : result
                }
                adminPostsModel.getPostCount((err,result) => {
                    // 获取总条数
                    let total = result.total;
                    // 算出最大页码,向上取整
                    let maxPage = Math.ceil(total / pageSize);
                    resObj.maxPage = maxPage;
                    res.send(resObj);
                })
            }
            else {
                resObj = {
                    code : 401,
                    msg : '获取失败'
                }
                res.send(resObj);
            }
        })
    },
    // 通过id筛选分类数据
    getPostByFilter(req,res) {
        let {categoryId,status,pageIndex,pageSize} = req.body;
        let offset = (pageIndex - 1) * pageSize;
        let sql = `SELECT posts.id,title,posts.\`status\`,created,nickname,\`name\` FROM posts 
        JOIN users ON posts.user_id=users.id  
        JOIN categories ON posts.category_id=categories.id`;   
        // 因为条件在获取总数的时候也要使用，把它暂时的保存起来
        let condition = '';
        if (categoryId != 'all' || status != 'all') {
            condition += ` WHERE `;
        }
        if (categoryId != 'all') {
            condition += `posts.category_id=${categoryId}`;
        }
        if (status != 'all') {
            if (categoryId != 'all') {
                condition += ' and ';
            }
            condition += ` posts.\`status\`='${status}' `;
        }
        sql += condition;
        sql += ` LIMIT ${offset},${pageSize}`;

        adminPostsModel.getPostByFilter(sql,(err,result) => {
            if (err) console.error(err);
            let resObj = {};
            result.forEach(e => {
                e.created = moment(e.created).format('YYYY-MM-DD HH:mm:ss');
            });
            if (result) {
                    resObj = {
                    code : 200,
                    msg : '获取成功',
                    data : result
                }
                // 获取最大页码数
                adminPostsModel.getPostCount(condition,(err,result) => {
                    if (err) console.error(err);
                    if (result) {
                        let maxPage = Math.ceil(result.total / pageSize);
                        resObj.maxPage = maxPage;
                    }
                    res.send(resObj);
                })
            }
            else {
                resObj = {
                    code : 401,
                    msg : '获取失败'
                }
                res.send(resObj);
            }
            
        })
    },
    // 处理图片的上传
    uploadImage(req,res) {
        // 创建一个用于解析post请求的对象
        let form = new formidable.IncomingForm();
        // 先指定上传的目录
        form.uploadDir = __dirname + '/../uploads';
        // 让上传回来的文件保存后缀名
        form.keepExtensions = true;
        // 开始解析
        form.parse(req,(err, fields, files) => {
            // err - 报错
            // fields - 字段
            // files - 上传回来的文件     
            // console.log(err);    
            // console.log(fields);    
            let resObj = {
                code : 401,
                msg : '上传失败'
            };
            if (!err) {
                resObj.code = 200;
                resObj.msg = '上传成功';
                let index = files.pic.path.indexOf('uploads');
                resObj.data = '/' + files.pic.path.substring(index);
            }
            res.send(resObj);
        });
    },
    // 创建新增文章数据
    addNewPosts(req,res) {
        // req.body里面是缺少一个用户id的，我们是从登录的session里面可以获取用户id的
        let user_id = req.session.userInfo.id;
        // 把session中获取的用户id存储到req.body中
        req.body.user_id = user_id;
        adminPostsModel.addNewPosts(req.body,(err,result) => {
            if (err) console.error(err);
            let resObj = {
                code : 401,
                msg : '新增失败'
            };
            if (result.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '新增成功';
            }
            res.send(resObj);
        })
    }

}