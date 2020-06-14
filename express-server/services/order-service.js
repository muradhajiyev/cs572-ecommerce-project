const 
    path = require('path'),
    { ObjectId } = require('mongodb'),
    HashMap = require('hashmap'),
    { ApiResponse, Buyer, Order,  OrderStatus, CashBackType  } = require(path.join(__dirname, "..", "models"));

function getCashBack(cashBack, type){
    switch(type){
        case CashBackType.EARNED:
        case CashBackType.REFUND:
            return cashBack;
        case CashBackType.SPENT:
            return -1*cashBack;
        default:
            throw new Error('Undefined cashback type: ' + type);
    }
}

//BODY: {cashbackPayment: 10, shippingAddressId: 'fdafr32rf545423', billingInfoId: 'fdfr874632das5',  }
exports.createOrder = function(buyerId, data){
    return new Promise((resolve, reject)=>{
        Buyer.findById(buyerId).populate('shoppingCart.productId')
            .exec((err, buyer) => {
                if(err){
                    return reject(err.message);
                }
                let sellerIds = new HashMap();
                let availableCashBack = buyer.cashBack.reduce((a,e)=>a+getCashBack(e.cashBack, e.type), 0);
                if(data.cashbackPayment > availableCashBack){
                    return reject('Insufficient cashback');
                }
                let cashbackPaymentPerProduct = data.cashbackPayment/buyer.shoppingCart.length;//product quantity is not important 
                buyer.shoppingCart.forEach(cart => {
                    let totalPayment = cart.productId.price * cart.quantity;
                    let product = {
                        product: {
                            title: cart.productId.title, 
                            price: cart.productId.price
                        },
                        quantity: cart.quantity,
                        cashbackPayment: cashbackPaymentPerProduct,
                        creditCardPayment: totalPayment - cashbackPaymentPerProduct,
                        totalPayment: totalPayment 
                    };
                    let sellerId = cart.productId.sellerId.toString();
                    if(!sellerIds.has(sellerId)){
                        sellerIds.set(sellerId, []);
                    }
                    sellerIds.get(sellerId).push(product);
                });
                let address = buyer.addresses.find(adr=>adr._id === new ObjectId(data.shippingAddressId));
                if(address === undefined){
                    return reject('Shipping address not defined');
                }
                let shippingAddress = {
                    zipCode: address.zipCode,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    phoneNumber: address.phoneNumber,
                    country: address.country                    
                };
                let blInfo = buyer.billingInfo.find(b=>b._id === new ObjectId(data.billingInfoId));
                if(blInfo === undefined){
                    return reject('Billing info not defined');
                }
                let billingInfo = {
                    cardNumber: blInfo.cardNumber,
                    cardName: blInfo.cardName,
                    expirationDate: blInfo.expirationDate,
                    securityNumber: blInfo.securityNumber,
                    billingAddress:blInfo.billingAddress
                };
                Order.getLastOrderNumber().then(lastOrderNumber=>{
                    sellerIds.forEach(function(products, sellerId){
                        new Order({
                            buyerId: new ObjectId(buyerId),
                            sellerId: sellerId,
                            orderNumber: ++lastOrderNumber,
                            orderDate: new Date(),
                            status: OrderStatus.CREATED,
                            canceledDate: null,
                            shippedDate: null,
                            deliveredDate: null,
                            products: products,
                            shippingAddress:shippingAddress,
                            billingInfo: billingInfo
                        }).save()
                        .then(order=>{
                            if(data.cashbackPayment>0){
                                buyer.cashBack.push({
                                    cashBack: products.reduce((a, p)=>a+p.cashbackPayment, 0),
                                    orderId: order._id,
                                    type: CashBackType.SPENT
                                });
                                buyer.save();
                            }
                        });  
                    });
                    resolve(new ApiResponse(200, 'success', {success: 'Order was created successfully'}));
                });
            });
        });
}

exports.cancelOrderByBuyer = function(buyerId, orderId){
    Order.findById(orderId)
        .then(order=>{
            if(order.buyerId.toString() === buyerId){
                return new ApiResponse(403, 'error', {message: 'Order does not exists'});
            }
            setStatus(order, OrderStatus.CANCELED)
                .then(order=>{
                    order.save();
                    return new ApiResponse(200, 'success', {message: 'Order status was updated successfully'});
                })
                .catch(err=>{
                    return new ApiResponse(403, 'error', err);
                });
        });
}

exports.setOrderStatusBySeller = function(sellerId, orderId, orderStatus){
    Order.findById(orderId)
        .then(order=>{
            if(order.sellerId.toString() === sellerId){
                return new ApiResponse(403, 'error', {message: 'Order does not exists'});
            }
            setStatus(order, orderStatus)
                .then(order=>{
                    order.save();
                    return new ApiResponse(200, 'success', {message: 'Order status was updated successfully'});
                })
                .catch(err=>{
                    return new ApiResponse(403, 'error', err);
                });
        });
}
function setStatus(order, orderStatus){
    return new Promise((resolve, reject)=>{
        switch(orderStatus.toUpperCase()){
            case CANCELED:
                    if (order.status !== OrderStatus.CREATED) {
                        return reject({message:"Order status cannot be changed to " + orderStatus});
                    }
                    order.canceledDate = new Date();
                    break;
                case SHIPPED:
                    if (order.status !== OrderStatus.CREATED) {
                        return reject({message:"Order status cannot be changed to " + orderStatus});
                    }
                    order.shippedDate = new Date();
                    break;
                case DELIVERED:
                    if (order.status !== OrderStatus.SHIPPED) {
                        return reject({message:"Order status cannot be changed to " + orderStatus});
                    }
                    order.deliveredDate = new Date();
                    break;
                default:
                    return reject({message:"Order status cannot be changed to " + orderStatus});
        }
        order.status = orderStatus;
        return resolve(order);
    });
}