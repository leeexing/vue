/**
 * created by leeing on 2017/8/23
 */
const router = require('koa-router')()
// const _ = require('lodash')
const userAPI = require('../controllers/user')

// 首页
router.get('/', async (ctx, next) => {
  ctx.body = '话题首页-- 获取用户信息'
})

// 获取用户信息
router.get('/:id', userAPI.getUserInfo) // 定义url的参数为id，用user的author方法映入router；加入了控制器。逻辑好复杂啊
router.post('/user', userAPI.postUserAuth)

module.exports = router
