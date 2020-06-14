const path = require('path'),
    ApiResponse = require(path.join(__dirname, 'ApiResponse')),
    User = require(path.join(__dirname, 'user')),
    Seller = require(path.join(__dirname, 'seller')),
    Buyer = require(path.join(__dirname, 'buyer')),
    Product = require(path.join(__dirname, 'product')),
    Order = require(path.join(__dirname, 'order'));

module.exports = {
    ApiResponse,
    User,
    Seller,
    Buyer,
    Product,
    Order
}