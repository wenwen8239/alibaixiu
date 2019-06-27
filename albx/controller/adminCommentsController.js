// 引入所有评论model
const commentsModel = require('../model/adminCommentModel');
// 引入格式化日期模块
const moment = require('moment');
module.exports = {
    getAllComments(req,res) {
        let {pageIndex,pageSize} = req.body;
        // 在数据库中获取所有评论
        commentsModel.getAllComments(pageIndex,pageSize,(err,result) => {
            if (err) console.error(err);
            result.forEach(e => {
                e.created = moment(e.created).format('YYYY-MM-DD hh:mm:ss');
            });
            let resObj = {
                code : 401,
                msg : '获取失败'
            }
            if (result.length > 0) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = result;
                commentsModel.getCountComments((err,result) => {
                    if (err) console.error(err);
                    if (result) {
                        let maxPage = Math.ceil(result.total / pageSize);
                        resObj.maxPage = maxPage;
                        
                    }
                    res.send(resObj);
                })
            }
            else {
                res.send(resObj);
            }
            
        })
    }
}
