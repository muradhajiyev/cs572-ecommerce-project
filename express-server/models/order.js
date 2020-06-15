const { Order } = require('.');

const path =require('path'),
    mongoose = require('mongoose'),
    OrderStatus = require(path.join(__dirname, 'order-status'));
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyerId: {type: Schema.Types.ObjectId, required: true, ref: 'Buyer'},
    sellerId: {type: Schema.Types.ObjectId, required: true, ref: 'Seller'},
    orderNumber: {type: Number, require: true},
    orderDate: {type: Date},
    status: {type: String, enum:[OrderStatus.CREATED, OrderStatus.CANCELED, OrderStatus.SHIPPED, OrderStatus.DELIVERED]},
    canceledDate: {type: Date},
    shippedDate: {type: Date},
    deliveredDate: {type: Date},
    products: [
        {
            product: {
                // todo: add product_id
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
        cardNumber: {type: String},
        cardName: {type: String},
        expirationDate: {type: Date},
        securityNumber: {type: String},
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
orderSchema.statics.getLastOrderNumber = function(){
    return this.aggregate(
        [
            { $group: {_id:'1', lastOrderNumber: { $max: "$orderNumber" } }}
        ]
     );
}


//collection name => orders
module.exports = mongoose.model('Order', orderSchema);