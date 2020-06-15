const mongoose = require('mongoose');
const userStatus = require('./enums/user-status');
const roleEnum = require('../_helpers/role');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true,},
    password: {type: String, required: true,},
    name: {type: String, required: true,},
    status: {
        type: String,
        enum: [ userStatus.ACTIVE, userStatus.PENDING, userStatus.REJECT ]
    },
    role: {
        type: String,
        enum: [ roleEnum.ADMIN, roleEnum.SELLER, roleEnum.BUYER ],
        required: true 
    }
})

//collection name => users
module.exports = mongoose.model('User', userSchema);