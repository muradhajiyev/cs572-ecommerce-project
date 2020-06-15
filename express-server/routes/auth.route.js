const
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    { authController } = require(path.join(__dirname, '..', 'controllers'));

router.post('/signup/:role', authController.signup);
router.post('/login', authController.login);

module.exports = router;