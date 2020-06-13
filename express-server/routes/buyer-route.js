const path = require("path"),
  router = require("express").Router(),
  { buyerController } = require(path.join(__dirname, "..", "controllers"));

//MARK:- Address cart CRUD Operation
router.get("/addresses", buyerController.getAllAddresses);
router.post("/addresses", buyerController.addAddress);
router.delete("/addresses/:id", buyerController.deleteAddress);
router.get("/addresses/:id", buyerController.getAddressDetail);
router.put("/addresses/:id", buyerController.editAddress);

//MARK:- Shopping cart CRUD Operation
router.get("shopping-cart", buyerController.getListShoppingCard);
router.post("shopping-cart", buyerController.addProductToShoppingCart);
router.put("shopping-cart/:id", buyerController.updateProductFromShoppingCart);
router.delete(
  "shopping-cart/:id",
  buyerController.deleteProductFromShoppingCart
);

//MARK:- Billing CRUD
router.get("/billing-info", buyerController.getAllBillingInfo);
router.post("/billing-info", buyerController.addBillingInfo);
router.delete("/billing-info/:id", buyerController.deleteBillingInfo);
router.get("/billing-info/:id", buyerController.getBillingInfoDetail);
router.put("/billing-info/:id", buyerController.editBillingInfo);

router.post("/follow-seller", buyerController.addFollowSeller);
router.delete("/follow-seller/:id", buyerController.deleteFollowSeller);

router.get(
  "/reviews/:productId",
  buyerController.getAllActiveReviewsByProductId
);
router.post(
  "/order/:orderId/product/:productId/add-review",
  buyerController.addReview
);
router.delete(
  "/delete-review/:productId/:reviewId",
  buyerController.deleteReview
);

router.post("/checkout", buyerController.createOrder);
router.post("/orders/:orderId/cancel", buyerController.cancelOrder);
router.get("/orders", buyerController.getMyOrders);

module.exports = router;
