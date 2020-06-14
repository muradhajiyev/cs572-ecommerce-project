const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    _id:{type: Schema.Types.ObjectId, ref: 'User', required:true}
})

//collection name => sellers
module.exports = mongoose.model('Seller', sellerSchema);