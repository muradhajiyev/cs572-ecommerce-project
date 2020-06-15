const router = require("express").Router();
const billingInfoController = require("../controllers/billing-info.controller");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

//TODO:: Add roles
router.get("/", billingInfoController.getAllBillingInfo);
router.post("/", billingInfoController.addBillingInfo);
router.delete("/:id", billingInfoController.deleteBillingInfo);
router.get("/:id", billingInfoController.getBillingInfoDetail);
router.put("/:id", billingInfoController.editBillingInfo);

module.exports = router;