const router = require("express").Router();
const { userController } = require("../controllers");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.post("/sellers/:id/follow", authorize(Role.BUYER),  userController.followSeller);
router.delete("/sellers/:id/unfollow/", authorize(Role.BUYER), userController.unfollowSeller);

router.get('/available-cashback', authorize(Role.BUYER), userController.getAvailableCashBack);

/* POST approve seller */
router.post("/sellers/:id/approve", authorize(Role.ADMIN), userController.approveSeller);
/* POST reject seller */
router.post("/sellers/:id/reject", authorize(Role.ADMIN), userController.rejectSeller);

module.exports = router;