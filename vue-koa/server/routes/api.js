/**
 * created by leeing on 2017/9/1
 */
const router = require('koa-router')()
// const _ = require('lodash')
const api = require('../controllers/api')

// 获取用户列表信息
router.get('/userlist', api.getUserList)
// 修改用户信息
router.post('/editUser', api.editUserInfo)
// 修改文章内容
router.post('/editArtical', api.editArtical)
// 新增文章内容 -- 保存
router.post('/addNewArtical', api.addNewArtical)
// 获取文章分类
router.get('/getCategory', api.getCategory)
// 查询音乐
router.get('/searchMusic', api.searchMusic)

module.exports = router
