const { Order } = require('.');

const path =require('path'),
    mongoose = require('mongoose'),
    OrderStatus = require(path.join(__dirname, 'enums', 'order-status'));
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
                productId: {type: Schema.Types.ObjectId, required: true, ref: 'Product'},
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

orderSchema.set('toJSON', { virtuals: true })

orderSchema.virtual('nextStage').get(function(){
    if (this.status === OrderStatus.CREATED)
        return "Mark it as shipped";
    else if (this.status === OrderStatus.SHIPPED)
        return "Mark it as delivered";

    return null;
})

//collection name => orders
module.exports = mongoose.model('Order', orderSchema);