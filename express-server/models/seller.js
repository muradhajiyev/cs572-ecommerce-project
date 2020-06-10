const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    _id:{type: Schema.Types.ObjectId, ref: 'User', required:true},
    products: [
        {
            productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true}
        }
    ]
})

//collection name => sellers
module.exports = mongoose.model('Seller', sellerSchema);