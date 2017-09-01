const mongoose = require('mongoose')
// 分类的表结构
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  // 分类名称
  name: String
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
