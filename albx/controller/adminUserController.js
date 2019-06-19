// 引入adminUserModel模块
const adminUserModel = require('../model/adminUserModel');
module.exports = {
    // 实现用户登录
    adminDoLogin(req,res) {
        // 判断用户名和密码是否一致
        adminUserModel.valiDateEmailAndPassword(req.body.email,req.body.password,(err,result) => {
            if (err) console.error(err);
            if (result) {
                // 把用户的登录状态存储到seesion中
                req.session.isLogin = true;
                // 将当前的用户数据存储到session中
                req.session.userInfo = result;
                res.send({
                    code : 200,
                    msg : '登录成功'
                })
            }
            else {
                res.send({
                    code : 401,
                    msg : '登录失败'
                })
            }
        })
    },

    // 获取用户的头像和昵称
    getUserHeadAndNickName(req,res) {
        if (req.session.userInfo) {
            // 获取返回的头像和昵称
            let {nickname,avatar} = req.session.userInfo;
            res.send({
                code : 200,
                msg : '获取成功',
                data : {
                    nickname,avatar
                }
            })
        }
        else {
            res.send({
                code : 200,
                msg : '获取失败'
            })
        }  
    }
}