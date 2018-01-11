// koa后台的入口文件
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const cors = require('koa2-cors') // 跨域
const WebSocket = require('ws')

// 数据库连接
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/myblog')
let User = require('./server/models/User')

// 路由
const index = require('./server/routes/index')

// middleWare
onerror(app)
app.use(cors({
  origin (ctx) {
    if (ctx.url === '/api/proxy/') {
      return ''
    }
    return 'http://localhost:8090'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// app.use(errorHandle)

app.use(async (ctx, next) => {
  ctx.userInfo = {}
  if (ctx.cookies.get('userInfo')) {
    ctx.userInfo = JSON.parse(ctx.cookies.get('userInfo'))
    ctx.userInfo.username = unescape(ctx.userInfo.username)
    let userInfo = await User.findById(ctx.userInfo.id)
    ctx.userInfo.isAdmin = !!userInfo.isAdmin
    await next()
  } else {
    await next()
  }
})
app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())

app.on('error', (err, next) => {
  console.log(`server error: ${err}`)
})

// mock 火星数据
const Mock = require('mockjs')
// let Random = Mock.Random

// websocket
const wss = new WebSocket.Server({port: 8080})
wss.on('connection', ws => {
  console.log('server: reveive connection!')
  ws.on('message', msg => {
    console.log(`我接到来自前台的信息： ${msg}`)
    if (msg === 'hello') {
      return
    }
    let n = Math.ceil(Math.random() * 3)
    console.log(n)
    let help = Mock.mock({
      'msgs|3': ['@ctitle(10, 20)', '@name', '@title(10, 20)', '@time', '@sentence', '@email']
    })
    setTimeout(() => {
      ws.send(help.msgs[Math.ceil(Math.random()*18)])
    }, n*1000)
  })

  ws.send('您好，拯救者，我需要你的帮忙')
})

// routes
app.use(index.routes(), index.allowedMethods())

app.listen(8081, () => {
  console.log(`koa is listening in 8081`)
})

module.exports = app
