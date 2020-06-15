const router = require("express").Router();
const { cartController } = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

//MARK:- Shopping cart CRUD Operation
router.get("cart", cartController.getListShoppingCard);
router.post("cart", cartController.addProductToShoppingCart);
router.put("cart/:id", cartController.updateProductFromShoppingCart);
router.delete("cart/:id", cartController.deleteProductFromShoppingCart);

module.exports = router;