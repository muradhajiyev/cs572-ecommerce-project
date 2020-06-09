const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
})

//collection name => admins
module.exports = mongoose.model('Admin', adminSchema);