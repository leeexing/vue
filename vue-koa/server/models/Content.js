const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contentSchema = new Schema({
  // 关联字段 --内容分类的id
  category: {
    // 类型
    // type: String,
    type: Schema.Types.ObjectId,
    // 引用
    ref: 'Category'
  },

  // 标题
  title: String,

  // 关联字段 --用户的id
  user: {
    // 类型
    type: Schema.Types.ObjectId,
    // 引用
    ref: 'User'
  },

  // 添加时间 --的id
  addTime: {
    // 类型
    type: Date,
    // 引用
    default: new Date()
  },

  // 阅读量
  views: {
    // 类型
    type: Number,
    // 引用
    default: 0
  },

  // 简介
  brife: {
    type: String,
    default: ''
  },

  // 内容
  content: {
    type: String,
    default: ''
  },

  // 评论
  comments: {
    type: Array,
    default: []
  }
})

const Content = mongoose.model('Content', contentSchema) // 要想在Schema里面被引用，得需要赋值到一个变量里面

module.exports = Content
