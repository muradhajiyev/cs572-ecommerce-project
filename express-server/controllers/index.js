const 
    path = require('path'),
    authController = require(path.join(__dirname, 'auth-controller')),
    buyerController = require(path.join(__dirname, 'buyer-controller'));

module.exports = { 
    authController,
    buyerController
 }
