const mongoose = require('mongoose');
const userStatus = require('./user-status');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true,},
    password: {type: String, required: true,},
    name: {type: String, required: true,},
    status: {
        type: String,
        enum: [ userStatus.ACTIVE, userStatus.PENDING, userStatus.REJECT ]
    },
    userType: {
        type: String,
        enum: ['ADMIN', 'SELLER', 'BUYER'],
        required: true 
    }
})

//collection name => users
module.exports = mongoose.model('User', userSchema);