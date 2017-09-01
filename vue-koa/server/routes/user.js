/**
 * created by leeing on 2017/8/23
 */
const router = require('koa-router')()
const userAPI = require('../controllers/user')

// 首页
router.get('/', async (ctx, next) => {
  ctx.body = '话题首页-- 获取用户信息'
})

// 获取用户信息
// 定义url的参数为id，用user的author方法映入router；加入了控制器。逻辑好复杂啊
router.get('/:id', userAPI.getUserInfo)
// 提交用户登录信息的接口
router.post('/login', userAPI.postUserAuth)
// 用户退出接口
router.post('/logout', userAPI.logout)
// 用户注册信息的接口
router.post('/register', userAPI.registerUser)

module.exports = router
