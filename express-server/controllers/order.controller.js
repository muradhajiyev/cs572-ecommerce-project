const path = require("path"),
    ApiResponse = require('./viewmodels/ApiResponse'),
    {
        Role,
        OrderStatus
    } = require(path.join(__dirname, "..", "models")),
    {
        orderService
    } = require(path.join(__dirname, "..", "services"));

const fs = require('fs');
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

exports.generateReceipt = function (req, res, next) {
    var html = fs.readFileSync(path.join(__dirname, "..", "views", "receipt.report.html"), 'utf8');
    pdf.create(html, {}).toFile('./businesscard.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
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
