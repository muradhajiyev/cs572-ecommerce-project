const path = require('path'),
    User = require(path.join(__dirname, 'user')),
    Seller = require(path.join(__dirname, 'seller')),
    Buyer = require(path.join(__dirname, 'buyer')),
    Product = require(path.join(__dirname, 'product')),
    UserStatus = require(path.join(__dirname, 'enums', 'user-status')),
    Role = require(path.join(__dirname, 'enums', 'user-role')),
    Order = require(path.join(__dirname, 'order')),
    OrderStatus = require(path.join(__dirname, 'enums', 'order-status')),
    ReviewStatus = require(path.join(__dirname, 'enums', 'review-status')),
    CashbackType = require(path.join(__dirname, 'enums', 'cashback-type'));

module.exports = {
    User,
    Seller,
    Buyer,
    Product,
    Order,
    UserStatus,
    OrderStatus,
    ReviewStatus,
    CashbackType,
    Role
}