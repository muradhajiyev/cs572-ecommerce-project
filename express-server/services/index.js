const path = require('path'),
    userService = require(path.join(__dirname, 'user-service')),
    buyerService = require(path.join(__dirname, 'buyer-service')),
    authService = require(path.join(__dirname, 'auth-service')),
    orderService = require(path.join(__dirname, 'order-service'));

module.exports = {
    authService,
    userService,
    buyerService,
    orderService
}