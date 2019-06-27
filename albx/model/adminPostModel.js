// 引入数据库模块
const sqlhelper = require('./sqlhelpes');
const connection = sqlhelper.sqlConnection;

module.exports = {  
    // 创建展示指定的所有数据
    getAllPosts(callback) {
        let sql = `SELECT posts.id,title,posts.\`status\`,created,nickname,\`name\` 
        FROM posts 
        JOIN users ON posts.user_id=users.id
        JOIN categories ON posts.category_id=categories.id`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    },
    // 获取分页数据
    getPostsByPage(pageIndex,pageSize,callback) {
        let sql = `SELECT posts.id,title,posts.\`status\`,created,nickname,\`name\` 
        FROM posts 
        JOIN users ON posts.user_id=users.id
        JOIN categories ON posts.category_id=categories.id    
        LIMIT ${(pageIndex-1)*pageSize},${pageSize}`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    },
    // 获取分页目录总条数
    getPostCount(condition,callback) {
        let sql = `select count(*) as total from posts` + condition;
        connection.query(sql,(err,result) => {
            callback(err,result[0]);
        })
    },
    // 通过id筛选分类数据
    getPostByFilter(sql,callback) {
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    },
    // 新增文章数据
    addNewPosts(data,callback) {
        let sql = `insert into posts set ?`;
        connection.query(sql,data,(err,result) => {
            callback(err,result);
        })
    },

    // 获取前台导航数据
    getNavigation(callback) {
        let sql = `select * from categories where isShow = 1`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    },
    // 获取最新发布文章数据
    getNewestPosts(callback) {
        let sql = `SELECT 
        posts.id,title,content,created,feature,views,likes,
        users.nickname,categories.\`name\` FROM posts
        JOIN categories ON posts.category_id=categories.id
        JOIN users ON posts.user_id=users.id
        ORDER BY created DESC
        LIMIT 5`;
        connection.query(sql,(err,result) => {
            callback(err,result);   
        })
    },
    // 根据id获取对应的文章数据
    getPostsById(id,pageIndex,pageSize,callback) {
        let offset = (pageIndex - 1) * pageSize;
        let sql = `SELECT 
        posts.id,title,content,created,feature,views,likes,
        users.nickname,categories.\`name\` FROM posts
        JOIN categories ON posts.category_id=categories.id
        JOIN users ON posts.user_id=users.id
        WHERE category_id = ${id}
        LIMIT ${offset},${pageSize}`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    },
    // 根据id获取详情页对应数据
    getPostDataById(id,callback) {
        let sql = `SELECT 
        categories.\`name\`,categories.id as category_id,
        posts.id,title,content,created,views,
        users.nickname
        FROM posts
        JOIN categories ON posts.category_id=categories.id
        JOIN users ON users.id=posts.user_id
        WHERE posts.id = ${id}`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    }
}