const 
    path = require('path'),
    authController = require(path.join(__dirname, 'auth.controller')),
    productController = require(path.join(__dirname, 'product.controller')),
    addressController = require(path.join(__dirname, 'address.controller')),
    billingInfoController = require(path.join(__dirname, 'billing-info.controller')),
    reviewController = require(path.join(__dirname, 'review.controller'));
    cartController = require(path.join(__dirname, 'cart.controller'));
    userController = require(path.join(__dirname, 'user.controller'));
    orderController = require(path.join(__dirname, 'order.controller'));



module.exports = { 
    authController,
    productController,
    addressController,
    billingInfoController,
    reviewController,
    cartController,
    userController,
    orderController
 }
