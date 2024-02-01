const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required:true},
    role: {type: String, default: Basic},
    date: {type: Date, default: Date.now()}
})

const user = mongoose.model('user', userSchema)
module.exports = user