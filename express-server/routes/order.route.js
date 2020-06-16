const router = require("express").Router();
const {orderController} = require("../controllers");
const Role = require('../models/enums/user-role');
const authorize = require('../_helpers/authorize');

router.post("/", authorize(Role.BUYER), orderController.createOrder);
router.get("/", authorize(Role.BUYER, Role.SELLER), orderController.getMyOrders);
router.put("/:orderId/cancel", authorize(Role.BUYER, Role.SELLER), orderController.cancelOrder);
router.put("/:orderId/shipped", authorize(Role.SELLER), orderController.makeOrderShipped);
router.put("/:orderId/delivered", authorize(Role.SELLER), orderController.makeOrderDelivered);

router.post("/receipt", orderController.generateReceipt);

module.exports = router;