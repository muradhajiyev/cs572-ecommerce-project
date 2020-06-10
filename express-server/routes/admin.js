var express = require("express");
const adminController = require("../controllers/admin");
var router = express.Router();

/* POST approve seller */
router.post("/api/seller/:id/approve", adminController.approveSeller);
/* POST reject seller */
router.post("/api/seller/:id/reject", adminController.rejectSeller);

module.exports = router;
