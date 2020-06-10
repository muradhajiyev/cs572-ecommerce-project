const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User', required:true},
    shoppingCart: [
        {
            productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}
        }
    ],
    address: [
        {
            zipCode: {type: String},
            street: {type:String},
            city: {type:String},
            state: {type:String},
            phoneNumber: {type:String},
            country: {type:String}
        }
    ],
    billingInfo: [
        {
            cardNumber:{type:String},
            cardName:{type:String},
            expirationDate:{type:Date},
            securityCode:{type:String},
            billingAddress:{
                zipCode:{type:String},
                street:{type:String},
                city:{type:String},
                state:{type:String},
                phoneNumber:{type:String},
                country:{type:String}
            }
        }
    ],
    follows: [
        {
            sellerId: {type: Schema.Types.ObjectId, ref: 'Seller', required: true}
        }
    ],
    cashBack: [
        {
            cashBack: {type: Number},
            orderId: {type: Schema.Types.ObjectId, ref: 'Order'},
            type: {type: String}
        }
    ]
})

//collection name => buyers
module.exports = mongoose.model('Buyer', buyerSchema);