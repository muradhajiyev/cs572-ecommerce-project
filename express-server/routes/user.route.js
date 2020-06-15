const router = require("express").Router();
const { userController } = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.post("/follow", authorize(Role.BUYER),  userController.followSeller);
router.delete("/follow/:id", authorize(Role.BUYER), userController.deleteFollowSeller);
router.get('/available-cashback', authorize(Role.BUYER, Role.SELLER), userController.getAvailableCashBack);

/* POST approve seller */
router.post("/seller/:id/approve", userController.approveSeller);
/* POST reject seller */
router.post("/seller/:id/reject", userController.rejectSeller);

module.exports = router;