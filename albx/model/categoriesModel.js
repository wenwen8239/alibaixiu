// 引入数据库模块
const sqlhelper = require('./sqlhelpes');
const connection = sqlhelper.sqlConnection;
module.exports = {
    // 获取所有分类
    getAllCategories(callback) {
        let sql = 'SELECT * FROM categories';
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    },
    // 添加新的数据到分类目录
    addNewCategory(data,callback) {
        let sql = `INSERT INTO categories SET \`NAME\`='${data.name}',slug='${data.slug}',classname='${data.classname}'`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    },
    // 根据id获取分类目录的数据
    getCategoryById(id,callback) {
        let sql = `select * from categories where id=${id}`;
        connection.query(sql,(err,result) => {
            callback(err,result[0]);
        })
    },
    // 根据id删除数据
    deleteCategoryById(id,callback) {
        let sql = `delete from categories where id='${id}'`;
        connection.query(sql,(err,result) =>{
            callback(err,result);
        }) 
    },
    // 根据id修改分类目录数据
    editCategoryById(id,data,callback) {
        let sql = `update categories set ? where id=${id}`;
        let str = connection.format(sql,data);
        console.log(str);
        connection.query(sql,data,(err,result) => {
            callback(err,data,result);
        })
    },
    // 通过多个id删除数据
    deleteMutliple(ids,callback) {
        let sql = `DELETE FROM categories WHERE id in (${ids})`;
        connection.query(sql,(err,result) => {
            callback(err,result);
        })
    }
}