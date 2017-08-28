const mongoose = require('mongoose')
const userSchema = require('../schema/User')

module.exports = mongoose.model('User', userSchema)
