const path = require('path'),
    User = require(path.join(__dirname, 'user')),
    Seller = require(path.join(__dirname, 'seller')),
    Buyer = require(path.join(__dirname, 'buyer')),
    Product = require(path.join(__dirname, 'product')),
    Order = require(path.join(__dirname, 'order')),
    UserStatus = require(path.join(__dirname, 'enums/user-status')),
    OrderStatus = require(path.join(__dirname, 'enums/order-status')),
    ReviewStatus = require(path.join(__dirname, 'enums/review-status')),
    CashBackType = require(path.join(__dirname, 'enums/cash-back-type'));

module.exports = {
    User,
    Seller,
    Buyer,
    Product,
    Order,
    UserStatus,
    OrderStatus,
    ReviewStatus,
    OrderStatus,
    CashBackType
}