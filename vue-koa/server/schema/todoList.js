const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  // 用户的id
  id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // 内容
  content: {
    type: Array,
    default: []
  }
})
