const router = require("express").Router();
const { userController } = require("../controllers");
const Role = require("../models/enums/user-role");
const authorize = require("../_helpers/authorize");

router.post("/sellers/:id/follow", authorize(Role.BUYER),  userController.followSeller);
router.delete("/sellers/:id/unfollow/", authorize(Role.BUYER), userController.unfollowSeller);

router.get("/available-cashback", authorize(Role.BUYER), userController.getAvailableCashback);

/* POST approve seller */
router.post("/sellers/:id/approve",
  authorize(Role.ADMIN),
  userController.approveSeller
);
/* POST reject seller */
router.post("/sellers/:id/reject",
  authorize(Role.ADMIN),
  userController.rejectSeller
);

/** POST post review */
router.post("/product/:productid/review/:id/post",
  authorize(Role.ADMIN),
  userController.postReview
);

/** POST reject review */
router.post("/product/:productid/review/:id/reject",
  authorize(Role.ADMIN),
  userController.rejectReview
);

module.exports = router;
