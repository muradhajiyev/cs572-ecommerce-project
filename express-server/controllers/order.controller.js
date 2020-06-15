const path = require("path"),
    {
        orderService
    } = require(path.join(__dirname, "..", "services"));
const ApiResponse = require('./viewmodels/ApiResponse');

exports.createOrder = (req, res) => {
    request(req, res, orderService.createOrder(req.user._id, req.body));
};

exports.cancelOrder = (req, res) => {
    request(
        req,
        res,
        orderService.cancelOrderByBuyer(req.userId, req.params.orderId)
    );
};

exports.getMyOrders = (req, res) => {
    request(req, res, orderService.getBuyerOrders(req.userId));
};

function request(req, res, promise) {
    promise
        .then((response) => {
            res.status(response.status).json(response);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(
                new ApiResponse(500, "error", {
                    message: err.message,
                    //, stack: err.stack
                })
            );
        });
}