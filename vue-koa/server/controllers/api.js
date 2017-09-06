const User = require('../models/User')
const Content = require('../models/Content')
const Category = require('../models/Category')
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

// 修改文章内容
async function editArtical (ctx) {
  let postData = ctx.request.body
  let updateData = {
    $set: {
      title: postData.title,
      brife: postData.brife,
      content: postData.content
    }
  }
  let result = await Content.findOne({_id: postData.id})
  console.log(result)
  if (result) {
    await Content.update({_id: postData.id}, updateData)
    ctx.body = {
      success: true,
      message: '内容修改成功'
    }
  } else {
    ctx.body = {
      success: false,
      message: '文章未找到，请确认'
    }
  }
}

// 增加新的文章 保存
async function addNewArtical (ctx) {
  let postData = ctx.request.body
  let hasUser = await User.findOne({_id: postData.user})
  if (!hasUser) {
    ctx.body = {
      success: false,
      message: '参数错误，用户名不存在'
    }
    return
  }
  await Content(postData).save()
  ctx.body = {
    success: true,
    message: '恭喜你，文章保存成功！'
  }
}

// 获取文章分类
async function getCategory (ctx) {
  let result = await Category.find()
  ctx.body = {
    success: true,
    message: result
  }
}

module.exports = {
  getUserList,
  editUserInfo,
  editArtical,
  addNewArtical,
  getCategory
}
