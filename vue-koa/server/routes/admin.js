const router = require('koa-router')()
const fs = require('fs')
const {markdown} = require('markdown')

// 数据表结构
const User = require('../models/User')

// 统一一个数据格式
let responseData = {
  success: false,
  message: ''
}

// 后台登录首页
router.get('/login', async (ctx, next) => {
  ctx.body = '登录首页'
})

// 登录
router.post('/login', async (ctx, next) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let hasUser = await User.findOne({
    username
  })
  console.log(hasUser)
  if (hasUser) {
    let result = await User.findOne({
      username,
      password
    })
    if (result) {
      responseData.success = true
      responseData.message = '用户登录成功'
      responseData.userInfo = {
        id: result._id,
        username: escape(result.username)
      }
      ctx.cookies.set('userInfo', JSON.stringify(responseData.userInfo))
      ctx.body = responseData
    } else {
      responseData.success = false
      responseData.message = '用户名密码错误!'
      ctx.body = responseData
    }
  } else {
    responseData.success = false
    responseData.message = '用户名不存在，请先注册！'
    ctx.body = responseData
  }
})

// 发布话题页面
router.get('/topic', async (ctx, next) => {
  ctx.body = '发布话题'
})

// 获取markdown的内容
router.get('/markdown', async (ctx, next) => {
  let getMarkdown = function () {
    return new Promise((resolve, reject) => {
      fs.readFile('./README.md', 'utf8', (error, data) => {
        if (error) {
          return reject(error)
        }
        return resolve(markdown.toHTML(data))
      })
    })
  }
  ctx.body = await getMarkdown()
})

// 通过fs读取index.html文件渲染到页面
router.get('/index', async (ctx, next) => {
  let getHtml = function () {
    return new Promise((resolve, reject) => {
      fs.readFile('./index.html', (err, data) => {
        if (err) {
          return reject(err)
        }
        console.log(data.toString())
        return resolve(data.toString())
      })
    })
  }
  ctx.body = await getHtml()
})

module.exports = router
