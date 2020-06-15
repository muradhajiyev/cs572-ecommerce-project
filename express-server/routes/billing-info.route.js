const router = require("express").Router();
const billingInfoController = require("../controllers/billing-info.controller");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


//TODO:: Add roles
router.get("/billing-info", authorize(), billingInfoController.getAllBillingInfo);
router.post("/billing-info", authorize(),  billingInfoController.addBillingInfo);
router.delete("/billing-info/:id", authorize(), billingInfoController.deleteBillingInfo);
router.get("/billing-info/:id", authorize(), billingInfoController.getBillingInfoDetail);
router.put("/billing-info/:id", authorize(), billingInfoController.editBillingInfo);

module.exports = router;