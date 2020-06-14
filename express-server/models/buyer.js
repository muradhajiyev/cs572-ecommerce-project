const path = require('path'),
    mongoose = require('mongoose'),
    CashBackType = require(path.join(__dirname, 'cash-back-type'))
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    _id:{type: Schema.Types.ObjectId, ref: 'User', required:true},
    shoppingCart: [
        {
            productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}
        }
    ],
    addresses: [
        {
            // id: {type: ObjectId},
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
            type: {type: String, enum:[CashBackType.EARNED, CashBackType.SPENT, CashBackType.REFUND]}
        }
    ]
})

//collection name => buyers
module.exports = mongoose.model('Buyer', buyerSchema);