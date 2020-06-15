const path = require("path");
const { orderService } = require(path.join(__dirname, "..", "services"));
const ApiResponse = require('./viewmodels/ApiResponse');

const fs = require('fs');
const pdf = require('html-pdf');


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


exports.generateReceipt = function(req, res, next){
    var html = fs.readFileSync(path.join(__dirname, "..", "views", "receipt.report.html"), 'utf8');
    pdf.create(html, {}).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
}