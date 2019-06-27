// 引入数据库模块
const mysql = require('./sqlhelpes');
const connection = mysql.sqlConnection;

module.exports = {
    // 获取评论分页数据
    getAllComments(pageIndex,pageSize,callback) {
        let offset = (pageIndex - 1) * pageSize;
        let sql = `SELECT comments.id,author,comments.content,title,comments.created,comments.\`status\` from comments 
        JOIN posts ON comments.post_id = posts.id 
        limit ${offset},${pageSize}`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    },
    // 获取评论总条数
    getCountComments(callback) {
        let sql = `SELECT COUNT(*) as total from comments`;
        connection.query(sql,(err,result) => {
            callback(err,result[0]);
        })
    }
}