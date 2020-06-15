const router = require("express").Router();
const {addressController} = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.get("/", addressController.getAllAddresses);
router.post("/", addressController.addAddress);
router.delete("/:id", addressController.deleteAddress);
router.get("/:id", addressController.getAddressDetail);
router.put("/:id", addressController.editAddress);

module.exports = router;