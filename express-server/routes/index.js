const
    path = require('path'),
    authRoute = require(path.join(__dirname, 'auth-route')),
    buyerRoute = require(path.join(__dirname, 'buyer-route')),
    adminRouter = require(path.join(__dirname, "admin-route")),
    sellerRouter = require(path.join(__dirname, "seller-route")),
    { verifyToken, authorizeAdmin, authorizeSeller, authorizeBuyer } = require(path.join(__dirname, 'security'));

module.exports = function(app){
    app.use('/api/auth', authRoute);
    app.use('/api/buyer', verifyToken, authorizeBuyer, buyerRoute);
    app.use('/api/admin', verifyToken, authorizeAdmin, adminRouter);
    app.use('/api/seller', verifyToken, authorizeSeller, sellerRouter);
    app.get('/', function(req, res, next) {
        res.send('Online market API is work');
    });
}

// =======
// const User = require("../models/user");


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'MWA eCommerce Project' });
// });


// /* It is supposed to test swagger, you can check from https://editor.swagger.io/
//    how to create documentation for route. */
//  /**
//    * @swagger
//    * /users:
//    *   get:
//    *     tags:
//    *       - user-controller
//    *     description: Returns user object
//    *     responses:
//    *       200:
//    *         description: user object
//    */
// router.get("/users", (req, res, next) => {
  
//   const userOne = new User({
//     email: "test@gmail.com",
//     password: "123456",
//     firstName: "Murad",
//     lastName: "Hajiyev",
//     status: "active",
//     userType: "seller"
//   });


//   res.json({ userOne });
// });

// module.exports = router;
// >>>>>>> master
