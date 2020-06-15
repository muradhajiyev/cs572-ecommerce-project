const router = require("express").Router();
const {reviewController} = require("../controllers");
const Role = require('../models/enums/user-role');
const authorize = require('../_helpers/authorize');

// TODO:: add roles to all routes

router.get("/product/:productId", reviewController.getAllActiveReviewsByProductId);

// let's discuss this route product: 5, Joe please check this implementation again.
router.post("/product/:productId", authorize() ,reviewController.addReview);

// reviews/:id - it is better. let's discuss
router.delete("/product/:productId", authorize(), reviewController.deleteReview);

module.exports = router;