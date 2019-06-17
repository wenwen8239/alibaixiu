const mysql = require('mysql');
const connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'albx33',
})
module.exports = {
    sqlConnection : connection
}