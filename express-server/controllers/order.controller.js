const path = require("path");
const ApiResponse = require('./viewmodels/ApiResponse');
const { Role, OrderStatus } = require(path.join(__dirname, "..", "models"));
const { orderService, userService } = require(path.join(__dirname, "..", "services"));
const pdf = require('html-pdf');

exports.createOrder = (req, res, next) => {
    orderService.createOrder(req.user._id, req.body)
        .then(orders => {
            return res.status(200).json(new ApiResponse(200, 'Order was created successfully', orders));
        })
        .catch(next);
};

exports.cancelOrder = (req, res, next) => {
    if (req.user.role === Role.BUYER) {
        orderService.cancelOrderByBuyer(req.userId, req.params.orderId)
            .then(order => {
                return res.status(200).json(new ApiResponse(200, 'Order status was updated successfully', order))
            })
            .catch(next);
    } else if (req.user.role === Role.SELLER) {
        orderService.setOrderStatusBySeller(req.userId, req.params.orderId, OrderStatus.CANCELED)
            .then(order => {
                return res.status(200).json(new ApiResponse(200, 'Order status was updated successfully', order))
            })
            .catch(next);
    }
};

exports.makeOrderShipped = (req, res, next) => {
    orderService.setOrderStatusBySeller(req.userId, req.params.orderId, OrderStatus.SHIPPED)
        .then(order => {
            return res.status(200).json(new ApiResponse(200, 'Order status was updated successfully', order))
        })
        .catch(next);
};

exports.makeOrderDelivered = (req, res, next) => {
    orderService.setOrderStatusBySeller(req.userId, req.params.orderId, OrderStatus.DELIVERED)
        .then(order => {
            return res.status(200).json(new ApiResponse(200, 'Order status was updated successfully', order))
        })
        .catch(next);
};

exports.getReceipt = async function (req, res, next) {
    const order = await orderService.getOrderById(req.params.orderId);
    const seller = await userService.getUserById(order.sellerId);
    const buyer = await userService.getUserById(order.buyerId);

    const receipt = orderService.generateReceipt(order, seller, buyer);

    pdf.create(receipt, {}).toStream(function (err, stream) {
        if (err) next(err);
        stream.pipe(res);
    });
}

exports.getMyOrders = (req, res, next) => {
    if (req.user.role === Role.BUYER) {
        orderService.getBuyerOrders(req.userId)
            .then(orders => {
                return res.status(200).json(new ApiResponse(200, 'success', orders))
            })
            .catch(next);
    } else {
        orderService.getSellerOrders(req.userId)
            .then(orders => {
                return res.status(200).json(new ApiResponse(200, 'success', orders))
            })
            .catch(next);
    }
};
