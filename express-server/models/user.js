const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true,},
    password: {type: String, required: true,},
    name: {type: String, required: true,},
    status: {type: String},
    userType: {type: String }
})

//collection name => users
module.exports = mongoose.model('User', userSchema);