const router = require("express").Router();
const {orderController} = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.post("/", authorize(Role.BUYER), orderController.createOrder);
router.put("/:orderId/cancel", authorize(Role.BUYER, Role.SELLER), orderController.cancelOrder);
router.get("/", authorize(Role.BUYER), orderController.getMyOrders);

router.post("/receipt", orderController.generateReceipt);

module.exports = router;