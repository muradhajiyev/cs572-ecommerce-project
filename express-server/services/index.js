const path = require('path'),
    userService = require(path.join(__dirname, 'user-service')),
    buyerService = require(path.join(__dirname, 'buyer-service')),
    authService = require(path.join(__dirname, 'auth-service')),
    orderService = require(path.join(__dirname, 'order-service'));
    productService = require(path.join(__dirname, 'product.service'));

module.exports = {
    authService,
    userService,
    buyerService,
    orderService,
    productService
}