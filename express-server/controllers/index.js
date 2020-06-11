const 
    path = require('path'),
    authController = require(path.join(__dirname, 'auth-controller')),
    adminController = require(path.join(__dirname, 'admin-controller')),
    buyerController = require(path.join(__dirname, 'buyer-controller'));

module.exports = { 
    authController,
    buyerController,
    adminController
 }
