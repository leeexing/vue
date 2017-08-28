const User = require('../models/User')
const jwt = require('koa-jwt') // 引入koa-jwt

async function getUserById (name) {
  const userInfo = await User.findOne({username: name})
  return userInfo // 返回用户数据
}

async function getUserInfo (ctx, next) {
  let id = ctx.params.id
  console.log(id)
  let result = await getUserById(id)
  ctx.body = result
}

async function postUserAuth (ctx, next) {
  let data = ctx.request.body // post过来的数据存在request.body里面
  let userInfo = await getUserById(data.name)

  if (userInfo !== null) {
    if (userInfo.password !== data.password) {
      this.body = {
        success: false, // success标志位是方便前端判断返回是否正确
        message: '密码错误！'
      }
    } else { // 如果密码正确
      let userToken = {
        name: userInfo.username,
        id: userInfo._id
      }
      let secret = 'vue-koa-lee'
      let token = jwt.sign(userToken, secret)
      ctx.body = {
        success: true,
        token // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      message: '用户不存在'
    }
  }
}

module.exports = {
  getUserInfo,
  postUserAuth
}
