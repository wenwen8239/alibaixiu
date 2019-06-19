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
    }
}