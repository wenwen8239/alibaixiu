const categrotyModel = require('../model/categoriesModel');
module.exports = {
    // 创建添加分类目录方法
    addNewCategory(req,res) {
        // 在数据库添加新的数据
        categrotyModel.addNewCategory(req.body,(err,result) => {
            if (err) console.error(err);
            let resObj = {};
            if (result.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '添加成功';
                let insertId = result.insertId;
                categrotyModel.getCategoryById(insertId,(err,result) => {
                    if (err) console.error(err);
                    if (result) {
                        resObj.data = result;
                    }
                    else {
                        res.msg = '查不到数据';
                    }
                    res.send(resObj);
                })
            }
            else {
                resObj.code = 401;
                resObj.msg = '添加失败';
                res.send(resObj);
            }
            
        })
    },
    // 创建删除选中的分类的方法
    deleteCategoryById(req,res) {
        categrotyModel.deleteCategoryById(req.query.id,(err,result) => {
            if (err) console.error(err);
            let resObj = {};
            if (result.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '删除成功';
                
            }
            else {
                resObj.code = 401;
                resObj.msg = '删除失败';
            }
            res.send(resObj);
        })
    },
    // 创建通过id获取数据库最新数据的方法
    getCategoryById(req,res) {
        categrotyModel.getCategoryById(req.query.id,(err,result) => {
            if (err) console.error(err);
            let resObj = {};
            if (result) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = result;
            }
            else {
                resObj.code = 401;
                resObj.msg = '获取失败';
            }
            res.send(resObj);
        })
    },
    // 创建实现编辑数据的方法
    editCategoryById(req,res) {
        let {id,name,slug,classname} = req.body;
        categrotyModel.editCategoryById(id,{name,slug,classname},(err,result) => {
            if (err) console.error(err);
            if (result) {
                categrotyModel.getCategoryById(id,(err,result) => {
                    let resObj = {};
                    if (err) console.error(err);
                    if (result) {
                        resObj.code = 200;
                        resObj.msg = '修改成功';
                        resObj.data = result;
                    }
                    else {
                        resObj.code = 401;
                        resObj.msg = '修改失败';
                    }
                    res.send(resObj);
                })
            }
        });
    },
    // 创建批量删除方法
    deleteMultiple(req,res) {
        // 获取所有的id
        let ids = req.query.ids;
        // 把数据扎转换为用,分隔的字符串
        let data = ids.join(',');
        categrotyModel.deleteMutliple(data,(err,result) => {
            if (err) console.error(err);
            let resObj = {};
            if (res.affectedRows != 0) {
                resObj = {
                    code : 200,
                    msg : '删除成功'
                }
            }
            else {
                resObj = {
                    code : 401,
                    msg : '删除失败'
                }
            }
            res.send(resObj);
        })
    },
    // 获取所有分类数据
    getAllCategory(req,res) {
        // 通过数据库获取数据
        categrotyModel.getAllCategories((err,result) => {
            if (err) console.error(err);
            let resObj = {};
            if (result.length != 0 ) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = result;
            }
            else {
                resObj.code = 200;
                resObj.msg = '获取失败';
            }
            res.send(resObj);
        })
    },
    // 让导航在页面中隐藏
    hideNavigation(req,res) {
        // 在数据库中设置隐藏
        categrotyModel.hideNavigation(req.query.id,(err,result) => {
            if (err) console.error(err);
            let resObj = {};
            if (result.length != 0 ) {
                resObj.code = 200;
                resObj.msg = '操作成功';
                resObj.data = result;
            }
            else {
                resObj.code = 200;
                resObj.msg = '操作失败';
            }
            res.send(resObj);
        })
    },
    // 让导航在页面中显示
    showNavigation(req,res) {
        // 在数据库中设置显示
        categrotyModel.showNavigation(req.query.id,(err,result) => {
            if (err) console.error(err);
            let resObj = {};
            if (result.length != 0 ) {
                resObj.code = 200;
                resObj.msg = '操作成功';
                resObj.data = result;
            }
            else {
                resObj.code = 200;
                resObj.msg = '操作失败';
            }
            res.send(resObj);
        })
    }

}