/**
 * 路由合并
 */
const router = require('koa-router')()

// index.html
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World. First Page ~'
})

const admin = require('./admin')
const user = require('./user')

router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

module.exports = router
