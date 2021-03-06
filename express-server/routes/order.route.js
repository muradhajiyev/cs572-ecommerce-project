const router = require("express").Router();
const {orderController} = require("../controllers");
const Role = require('../models/enums/user-role');
const authorize = require('../_helpers/authorize');

router.post("/", authorize(Role.BUYER), orderController.createOrder);
router.get("/", authorize(Role.BUYER, Role.SELLER), orderController.getMyOrders);
router.put("/:orderId/cancel", authorize(Role.BUYER, Role.SELLER), orderController.cancelOrder);

router.put('/:orderId/process', authorize(Role.SELLER), orderController.processOrder);
/* these two api's are redundant, only process shipping status api is enough 
as all order status will be processed step by step. Created -> Shipped -> Delivered */
router.put("/:orderId/shipped", authorize(Role.SELLER), orderController.makeOrderShipped);
router.put("/:orderId/delivered", authorize(Role.SELLER), orderController.makeOrderDelivered);

router.get("/:orderId/receipt", orderController.getReceipt);

module.exports = router;