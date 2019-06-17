// 引入数据库模块
const sqlhelper = require('./sqlhelpes');
const connection = sqlhelper.sqlConnection;
module.exports = {
    // 封装用户名和密码是否一致的方法
    valiDateEmailAndPassword(email,password,callback) {
        let sql = `select * from users where email='${email}' and \`password\`='${password}'`;
        connection.query(sql,(err,result) => {
            callback(err,result[0]);
        })
    },
    // 封装获取所有用户数据的方法
    geiAdminUsers(callback) {
        let sql = `select * from users where isDelete=0`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    }
}