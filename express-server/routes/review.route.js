const router = require("express").Router();
const {reviewController} = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

// TODO:: add roles to all routes

router.get("/reviews/:productId", authorize() ,reviewController.getAllActiveReviewsByProductId);

// let's discuss this route
router.post("/order/:orderId/product/:productId/add-review", authorize() ,reviewController.addReview);

// reviews/:id - it is better. let's discuss
router.delete("/delete-review/:productId/:reviewId", authorize(), reviewController.deleteReview);

module.exports = router;