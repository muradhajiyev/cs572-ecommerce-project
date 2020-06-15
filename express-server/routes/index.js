const
    path = require('path'),
    authRoute = require(path.join(__dirname, 'auth.route')),
    productRouter = require(path.join(__dirname, "product.route")),
    addressRouter = require(path.join(__dirname, "address.route")),
    billingInfoRouter = require(path.join(__dirname, "billing-info.route")),
    reviewRouter = require(path.join(__dirname, "review.route")),
    cartRouter = require(path.join(__dirname, "cart.route")),
    userRouter = require(path.join(__dirname, "user.route")),
    orderRouter = require(path.join(__dirname, "order.route"));

module.exports = function(app){
    app.use('/api/auth', authRoute);
    app.use('/api', productRouter);
    app.use('/api', addressRouter);
    app.use('/api', billingInfoRouter);
    app.use('/api', reviewRouter);
    app.use('/api', cartRouter);
    app.use('/api/users/', userRouter);
    app.use('/api/', orderRouter);
    app.get('/', function(req, res, next) {
        res.send('Online market API is work');
    });
}
