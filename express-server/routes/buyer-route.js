const path = require("path"),
  router = require("express").Router(),
  { buyerController } = require(path.join(__dirname, "..", "controllers"));

//MARK:- Address cart CURD Operation
router.get("/addresses", buyerController.getAllAddresses);
router.post("/addresses", buyerController.addAddress);
router.delete("/addresses/:id", buyerController.deleteAddress);
router.get("/addresses/:id", buyerController.getAddressDetail);
router.put("/addresses/:id", buyerController.editAddress);

//MARK:- Shopping cart CURD Operation
router.get("shopping-cart", buyerController.getListShoppingCard);
router.post("shopping-cart", buyerController.addProductToShoppingCart);
router.put("shopping-cart/:id", buyerController.updateProductFromShoppingCart);
router.delete(
  "shopping-cart/:id",
  buyerController.deleteProductFromShoppingCart
);

module.exports = router;
