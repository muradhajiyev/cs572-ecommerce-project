const router = require("express").Router();
const {orderController} = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.post("/checkout", authorize(Role.BUYER), orderController.createOrder);
router.post("/orders/:orderId/cancel", authorize(Role.BUYER, Role.SELLER), orderController.cancelOrder);
router.get("/orders", authorize(Role.BUYER), orderController.getMyOrders);

module.exports = router;