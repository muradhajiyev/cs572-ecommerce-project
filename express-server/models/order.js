const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyerId: {type: Schema.Types.ObjectId, required: true, ref: 'Buyer'},
    sellerId: {type: Schema.Types.ObjectId, required: true, ref: 'Seller'},
    orderDate: {type: Date},
    status: {type: String},
    shippedDate: {type: Date},
    deliveredDate: {type: Date},
    products: [
        {
            product: {
                price: {type: Number},
                title: {type: String}
            },
            quantity: {type: Number},
            cashbackPayment: {type: Number},
            creditCardPayment: {type: Number},
            totalPayment: {type: Number},
        }
    ],
    shippingAddress:{
        zipCode: {type: String},
        street: {type: String},
        city: {type: String},
        state: {type: String},
        phoneNumber: {type: String},
        country: {type: String},
    },
    billingInfo: {
        type: {type: String},
        cardNumber: {type: String},
        cardName: {type: String},
        expirationDate: {type: Date},
        securityNumber: {type: String},
        accountName: {type: String},
        accountNumber: {type: String},
        routingNumber: {type: String},
        billingAddress:{
            zipCode: {type: String},
            street: {type: String},
            city: {type: String},
            state: {type: String},
            phoneNumber: {type: String},
            country: {type: String},
        }
    }
})

//collection name => orders
module.exports = mongoose.model('Order', orderSchema);