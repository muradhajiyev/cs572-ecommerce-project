const
    path = require('path'),
    authRoute = require(path.join(__dirname, 'auth.route')),
    productRouter = require(path.join(__dirname, "product.route")),
    addressRouter = require(path.join(__dirname, "address.route")),
    billingInfoRouter = require(path.join(__dirname, "billing-info.route")),
    reviewRouter = require(path.join(__dirname, "review.route")),
    cartRouter = require(path.join(__dirname, "cart.route")),
    userRouter = require(path.join(__dirname, "user.route")),
    orderRouter = require(path.join(__dirname, "order.route")),
    categoryRouter = require(path.join(__dirname, "category.route"));

const Role = require('../models/enums/user-role');
const authorize = require('../_helpers/authorize');

module.exports = function (app) {
    app.use('/api/auth', authRoute);
    app.use('/api/products', productRouter);
    app.use('/api/addresses', authorize(Role.BUYER), addressRouter);
    app.use('/api/billing-info', authorize(Role.BUYER), billingInfoRouter);
    app.use('/api/reviews', reviewRouter);
    app.use('/api/carts', authorize(Role.BUYER), cartRouter);
    app.use('/api/users', userRouter);
    app.use('/api/orders', orderRouter);
    app.use('/api/categories', categoryRouter);
    app.get('/', function (req, res, next) {
        res.send('Online market API is work');
    });
}
