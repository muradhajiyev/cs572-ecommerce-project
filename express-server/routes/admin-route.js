const 
    path = require('path'),
    { adminController } = require(path.join(__dirname, '..', 'controllers'));
    router = require("express").Router();

/* POST approve seller */
router.post("/seller/:id/approve", adminController.approveSeller);
/* POST reject seller */
router.post("/seller/:id/reject", adminController.rejectSeller);

module.exports = router;
