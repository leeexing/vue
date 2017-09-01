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

module.exports = router
