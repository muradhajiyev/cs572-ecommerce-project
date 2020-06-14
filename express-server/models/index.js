const path = require('path'),
    ApiResponse = require(path.join(__dirname, 'ApiResponse')),
    User = require(path.join(__dirname, 'user')),
    Seller = require(path.join(__dirname, 'seller')),
    Buyer = require(path.join(__dirname, 'buyer')),
    Product = require(path.join(__dirname, 'product')),
    Order = require(path.join(__dirname, 'order')),
    OrderStatus = require(path.join(__dirname, 'order-status')),
    ReviewStatus = require(path.join(__dirname, 'review-status')),
    UserStatus = require(path.join(__dirname, 'user-status'));

module.exports = {
    ApiResponse,
    User,
    Seller,
    Buyer,
    Product,
    Order,
    UserStatus,
    OrderStatus,
    ReviewStatus
}