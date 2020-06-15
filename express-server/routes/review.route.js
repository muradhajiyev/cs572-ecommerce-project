const router = require("express").Router();
const {reviewController} = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.get("/product/:productId", reviewController.getAllActiveReviewsByProductId);
router.get("/user/product/:productId", authorize(Role.BUYER), reviewController.getProductReviewByUserId)

router.post("/product/:productId", authorize(Role.BUYER) ,reviewController.addReview);

router.delete("/product/:productId", authorize(Role.BUYER, Role.SELLER), reviewController.deleteReview);

module.exports = router;