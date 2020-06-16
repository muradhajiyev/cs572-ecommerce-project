const path = require('path'),
    User = require(path.join(__dirname, 'user')),
    Seller = require(path.join(__dirname, 'seller')),
    Buyer = require(path.join(__dirname, 'buyer')),
    Product = require(path.join(__dirname, 'product')),
    Category = require(path.join(__dirname, 'category')),
    Order = require(path.join(__dirname, 'order')),
    UserStatus = require(path.join(__dirname, 'enums', 'user-status')),
    Role = require(path.join(__dirname, 'enums', 'user-role')),
    OrderStatus = require(path.join(__dirname, 'enums', 'order-status')),
    ReviewStatus = require(path.join(__dirname, 'enums', 'review-status')),
    CashbackType = require(path.join(__dirname, 'enums', 'cashback-type'));

module.exports = {
    User,
    Seller,
    Buyer,
    Product,
    Category,
    Order,
    UserStatus,
    OrderStatus,
    ReviewStatus,
    CashbackType,
    Role
}