var express = require('express');
var router = express.Router();

const User = require("../models/user");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MWA eCommerce Project' });
});


/* It is supposed to test swagger, you can check from https://editor.swagger.io/
   how to create documentation for route. */
 /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - user-controller
   *     description: Returns user object
   *     responses:
   *       200:
   *         description: user object
   */
router.get("/users", (req, res, next) => {
  
  const userOne = new User({
    email: "test@gmail.com",
    password: "123456",
    firstName: "Murad",
    lastName: "Hajiyev",
    status: "active",
    userType: "seller"
  });


  res.json({ userOne });
});

module.exports = router;