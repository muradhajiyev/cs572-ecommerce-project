const router = require("express").Router();
const { cartController } = require("../controllers");


//MARK:- Shopping cart CRUD Operation
router.get("/",  cartController.getListShoppingCard);
router.post("/", cartController.addProductToShoppingCart);
router.put("/:id", cartController.updateProductFromShoppingCart);
router.delete("/:id", cartController.deleteProductFromShoppingCart);

module.exports = router;