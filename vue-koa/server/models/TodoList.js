const mongoose = require('mongoose')
const TodoListSchema = require('../schema/todolist')

module.exports = mongoose.model('TodoList', TodoListSchema)
