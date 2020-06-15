const router = require("express").Router();
const {addressController} = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.get("/addresses", authorize(), addressController.getAllAddresses);
router.post("/addresses", authorize(Role.BUYER), addressController.addAddress);
router.delete("/addresses/:id", authorize(Role.BUYER), addressController.deleteAddress);
router.get("/addresses/:id", authorize(Role.BUYER), addressController.getAddressDetail);
router.put("/addresses/:id", authorize(Role.BUYER), addressController.editAddress);

module.exports = router;