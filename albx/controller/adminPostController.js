const adminPostsModel = require('../model/adminPostModel');

module.exports = {
    getPostByPage(req,res) {
        let {pageIndex,pageSize} = req.body;
        adminPostsModel.getPostsByPage(pageIndex,pageSize,(err,result) => {
            if (err) console.error(err);
            let resObj = {};
            if (result) {
                resObj = {
                    code : 200,
                    msg : '获取成功',
                    data : result
                }
            }
            else {
                resObj = {
                    code : 401,
                    msg : '获取失败'
                }
            }
            res.send(resObj);
        })
    }

}