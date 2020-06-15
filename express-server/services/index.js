const path = require('path'),
    userService = require(path.join(__dirname, 'user.service')),
    authService = require(path.join(__dirname, 'auth.service')),
    orderService = require(path.join(__dirname, 'order.service'));
    productService = require(path.join(__dirname, 'product.service'));
    addressService = require(path.join(__dirname, 'address.service'));
    reviewService = require(path.join(__dirname, 'review.service'));

module.exports = {
    authService,
    userService,
    orderService,
    productService,
    addressService,
    reviewService
}