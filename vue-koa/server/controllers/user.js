const User = require('../models/User')
// const jwt = require('koa-jwt') // 引入koa-jwt. koa2中使用方法不同了
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
  let userInfo = await getUserById(data.username)

  if (userInfo !== null) {
    // if (userInfo.password !== data.password) {
    console.log(userInfo.password)
    if (!bcrypt.compareSync(data.password, userInfo.password)) { // 第一个参数必须是用户输入的数据
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是否正确
        message: '密码错误！'
      }
    } else { // 如果密码正确
      let userToken = {
        name: userInfo.username,
        id: userInfo._id
      }
      // let secret = 'vue-koa-token' // 指定秘钥；合适之后用来判断 token 合法性的标识
      // let token = jwt.sign(userToken, secret) // 签发 token
      ctx.body = {
        success: true,
        message: '用户登录成功过',
        token: userToken // 返回token
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
