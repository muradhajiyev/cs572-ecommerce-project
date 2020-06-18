const fs = require('fs');
const
    path = require('path'),
    { ObjectId } = require('mongodb'),
    HashMap = require('hashmap'),
    cashbackService = require('./cashback.service'),
    { Buyer, Order, OrderStatus } = require(path.join(__dirname, "..", "models"));

//BODY: {cashbackPayment: 10, shippingAddressId: 'fdafr32rf545423', billingInfoId: 'fdfr874632das5',  }
exports.createOrder = async function (buyerId, data) {
    let buyer = await Buyer.findById(buyerId);
    buyer = await buyer
        .populate('shoppingCart.productId')
        .execPopulate();

    if (buyer.shoppingCart.length === 0) {
        throw new Error('Shopping cart is empty');
    }
    let sellerIds = new HashMap();
    let availableCashBack = cashbackService.getAvailableCashbackByBuyer(buyer);
    if (data.cashbackPayment > availableCashBack) {
        throw new Error('Insufficient cashback');
    }
    let cashbackPaymentPerProduct = data.cashbackPayment / buyer.shoppingCart.length;//product quantity is not important 
    buyer.shoppingCart.forEach(cart => {
        let sellerId = cart.productId.sellerId.toString();
        if (!sellerIds.has(sellerId)) {
            sellerIds.set(sellerId, []);
        }
        let totalPayment = cart.productId.price * cart.quantity;
        let product = {
            product: {
                productId: cart.productId._id,
                title: cart.productId.title,
                price: cart.productId.price
            },
            quantity: cart.quantity,
            cashbackPayment: cashbackPaymentPerProduct,
            creditCardPayment: totalPayment - cashbackPaymentPerProduct,
            totalPayment: totalPayment
        };
        sellerIds.get(sellerId).push(product);
    });

    let address = buyer.addresses.find(adr => adr._id.toString() === data.shippingAddressId);
    if (address === undefined) {
        throw new Error('Shipping address not defined');
    }
    let shippingAddress = {
        zipCode: address.zipCode,
        street: address.street,
        city: address.city,
        state: address.state,
        phoneNumber: address.phoneNumber,
        country: address.country
    };
    let blInfo = buyer.billingInfo.find(b => b._id.toString() === data.billingInfoId);
    if (blInfo === undefined) {
        throw new Error('Billing info not defined');
    }
    let billingInfo = {
        cardNumber: blInfo.cardNumber,
        cardName: blInfo.cardName,
        expirationDate: blInfo.expirationDate,
        securityNumber: blInfo.securityNumber,
        billingAddress: blInfo.billingAddress
    };
    let result = await createOrders(buyerId, buyer, data, sellerIds, shippingAddress, billingInfo);

    buyer.shoppingCart = [];
    console.log("buyer2", buyer);
    await buyer.save();
    return result;
}
function createOrders(buyerId, buyer, data, sellerIds, shippingAddress, billingInfo) {
    return getLastOrderNumber()
        .then(lastOrderNumber => {
            let result = [];
            let tmp = [];
            sellerIds.forEach(function (products, sellerId) {
                tmp.push({ k: sellerId, v: products });
                console.log("1", tmp);
            });
            console.log("2", tmp);
            var bar = new Promise((resolve, reject) => {
                tmp.forEach(function (i, index) {
                    let products = i.v;
                    let sellerId = i.k;
                    let order = new Order({
                        buyerId: new ObjectId(buyerId),
                        sellerId: sellerId,
                        orderNumber: ++lastOrderNumber,
                        orderDate: new Date(),
                        status: OrderStatus.CREATED,
                        canceledDate: null,
                        shippedDate: null,
                        deliveredDate: null,
                        products: products,
                        shippingAddress: shippingAddress,
                        billingInfo: billingInfo
                    });
                    return order.save().then(order => {
                        if (order) {
                            result.push(order);
                            if (data.cashbackPayment > 0) {
                                buyer = cashbackService.spendCashback(buyer, order._id, products.reduce((a, p) => a + p.cashbackPayment, 0));
                                console.log("buyer1", buyer);
                            }
                        } else {
                            throw new Error(`Order ${lastOrderNumber} not created`);
                        }
                        console.log("3", tmp);
                        if (index === tmp.length -1) resolve();
                    });
                });
            });
            
            return bar.then(() => {
                console.log("4", tmp);
                return result;
            });
        });
}
async function getLastOrderNumber() {
    let orders = await Order.getLastOrderNumber();
    let lastOrderNumber = 0;
    if (orders.length > 0) {
        lastOrderNumber = orders[0].lastOrderNumber;
    }
    return lastOrderNumber;
}

exports.cancelOrderByBuyer = async function (buyerId, orderId) {
    let order = await Order.findById(orderId);
    if (!order || order.buyerId.toString() !== buyerId) {
        throw new Error('Order does not exists');
    }
    order = setStatus(order, OrderStatus.CANCELED);
    order = await order.save();
    if (!order) {
        throw new Error('Order is not canceled');
    }
    let buyer = await Buyer.findById(buyerId);

    let cashBack = order.products.reduce((a, p) => a + p.cashbackPayment, 0);
    buyer = cashbackService.refundCashback(buyer, order._id, cashBack);

    await buyer.save();
    return order;
}

exports.setOrderStatusBySeller = async function (sellerId, orderId, orderStatus) {
    let order = await Order.findById(orderId);
    if (!order || order.sellerId.toString() !== sellerId) {
        throw new Error('Order does not exists');
    }

    if(orderStatus === OrderStatus.CANCELED && order.status !== OrderStatus.CREATED)
        throw Error('Only Orders in Created status can be canceled.');

    order = setStatus(order, orderStatus);
    order = await order.save();
    if (!order) {
        throw new Error('Order status could not be processed.');
    }


    if (orderStatus === OrderStatus.CANCELED || orderStatus === OrderStatus.DELIVERED) {
        let buyer = await Buyer.findById(order.buyerId);
        if (orderStatus === OrderStatus.CANCELED) {
            let cashBack = order.products.reduce((a, p) => a + p.cashbackPayment, 0);
            buyer = cashbackService.refundCashback(buyer, order._id, cashBack);

        } else if (orderStatus === OrderStatus.DELIVERED) {
            let cashBack = order.products.reduce((a, p) => a + p.creditCardPayment, 0) / 100;
            buyer = cashbackService.earnCashback(buyer, order._id, cashBack);
        }
        await buyer.save();
    }
    return order;
}

exports.getBuyerOrders = async function (buyerId) {
    return await Order.find({ buyerId: new ObjectId(buyerId) });
}

exports.getSellerOrders = async function (sellerId) {
    return await Order.find({ sellerId: new ObjectId(sellerId) });
}

exports.getOrderById = async function (orderId) {
    const order = await Order.findById({ _id: new ObjectId(orderId) });
    if (!order) throw Error(`No order exists with this id ${orderId}`);
    return order;
}


exports.generateReceipt = function (order, seller, buyer) {
    var html = fs.readFileSync(path.join(__dirname, "..", "views", "receipt.report.html"), 'utf8');
    html = html.replace("${num}", order.orderNumber);
    html = html.replace("${seller}", seller.name);
    html = html.replace("${buyer}", buyer.name);
    html = html.replace("${address}", `${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.street}, ${order.shippingAddress.country}`);
    let rows = '';
    order.products.forEach((item, index) => {
        rows += `
        <tr>
            <td>${item.product.title}</td>
            <td>${item.product.price}</td>
            <td>${item.quantity}</td>
            <td>${item.cashbackPayment}</td>
            <td>${item.creditCardPayment}</td>
            <td>${item.totalPayment}</td>
        </tr>`
    })

    html = html.replace("${rows}", rows);

    return html;
}

function setStatus(order, orderStatus) {
    switch (orderStatus.toUpperCase()) {
        case OrderStatus.CANCELED:
            if (order.status !== OrderStatus.CREATED) {
                throw new Error(`Order status cannot be changed to ${orderStatus}`);
            }
            order.canceledDate = new Date();
            break;
        case OrderStatus.SHIPPED:
            if (order.status !== OrderStatus.CREATED) {
                throw new Error(`Order status cannot be changed to ${orderStatus}`);
            }
            order.shippedDate = new Date();
            break;
        case OrderStatus.DELIVERED:
            if (order.status !== OrderStatus.SHIPPED) {
                throw new Error(`Order status cannot be changed to ${orderStatus}`);
            }
            order.deliveredDate = new Date();
            break;
        default:
            throw new Error(`Order status cannot be changed to ${orderStatus}`);
    }
    order.status = orderStatus;
    return order;
}