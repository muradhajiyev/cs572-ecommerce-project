const
    path = require('path'),
    authRoute = require(path.join(__dirname, 'auth-route')),
    buyerRoute = require(path.join(__dirname, 'buyer-route')),
    
    { verifyToken, authorizeAdmin, authorizeSeller, authorizeBuyer } = require(path.join(__dirname, 'security'))
    ;

module.exports = function(app){
    app.use('/api/auth', authRoute);
    app.use('/api/buyer', verifyToken, authorizeBuyer, buyerRoute);
    app.get('/', function(req, res, next) {
        res.send('Online market API is work');
    });
}

