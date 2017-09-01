const User = require('../models/User')
const _ = require('lodash')

// 获取用户列表
async function getUserList (ctx) {
  let users = await User.find()
  ctx.body = {
    success: true,
    message: users
  }
}

// 用户列表；修改用户信息
async function editUserInfo (ctx) {
  let postData = ctx.request.body
  let result = await User.findOne({username: postData.username})
  if (result) {
    if (_.isEqual(result.password, postData.password)) {
      if (!_.isEqual(postData.isAdmin, result.isAdmin)) {
        await User.update({_id: postData.id}, {isAdmin: postData.isAdmin})
        ctx.body = {
          success: true,
          message: '管理员属性变更，修改成功！'
        }
      } else {
        ctx.body = {
          success: true,
          message: '密码没有改动，修改成功！'
        }
      }
    } else {
      await User.update({_id: postData.id}, {password: postData.password})
      ctx.body = {
        success: true,
        message: '密码修改成功！'
      }
    }
  } else {
    ctx.body = {
      success: false,
      message: '修改用户不存在'
    }
  }
}

module.exports = {
  getUserList,
  editUserInfo
}
